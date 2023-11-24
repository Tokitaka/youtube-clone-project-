import User from "../models/User";
import bcrypt from "bcrypt";
import e from "express";
import fetch from "node-fetch";

export const getJoin = (req, res)=>{ res.render("join", {pageTitle: "Create Account"})};
export const postJoin = async (req, res)=>{
    const {name, email, username, password, password2, location} = req.body;
    const pageTitle = "Join";
    if(password != password2){ 
        return res.status(400).render("join", {
            pageTitle, 
            errorMessage: "Password confirmation does not match",
        });
}
	const exists = await User.exists({$or: [{username},{email}]});
    if(exists) {
	return res.status(400).render("join", {
	pageTitle,
	errorMessage:"This username/emial is already taken.",
})}
    try{
        await User.create({
            name, email, username, password, location
        });
        return res.redirect("/login");
    }catch(error){
        return res.status(500).render("join", {
            pageTitle,
            errorMessage:error._message,
        });
    }
   
 };

export const getLogin = (req, res)=>{ res.render("login", {pageTitle: "Login"})};
export const postLogin = async (req, res)=>{ 
    const {username, password} = req.body;
    const user = await User.findOne({username, socialOnly : false});
    if(!user) {
        return  res.status(400).render("login", {pageTitle: "Login", errorMessage: "An account with this username does not exist"})
    }
    const ok = bcrypt.compare(password, user.password);
    if(!ok) {
        return  res.status(400).render("login", {pageTitle: "Login", errorMessage: "Password incorrect"})
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");

};
export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id : process.env.GH_CLIENT_ID,
        scope : "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const githubUrl = `${baseUrl}?${params}`;
    return res.redirect(githubUrl);
};
export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token"
    const config = {
        client_id : process.env.GH_CLIENT_ID,
        client_secret : process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const githubUrl = `${baseUrl}?${params}`;

    const tokenRequest = await (
        await fetch(githubUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })).json();

    if("access_token" in tokenRequest){
        const {access_token} = tokenRequest;
        const apiUrl ="https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
            method: "GET",
            headers:{
                Authorization: `token ${access_token}`,
            },
        })).json();
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
            method: "GET",
            headers:{
                Authorization: `token ${access_token}`,
            },
        })).json();
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true);
        if(!emailObj){
            return res.redirect("/login");
        }
        let user = await User.findOne({email: emailObj.email});
        console.log(userData);
        if(!user){
            user = await User.create({
                name:userData.name,
                username:userData.login,
                email:emailObj.email,
                password:"",
                socialOnly: true,
                location:userData.location,
                avatarUrl: userData.avatar_url,
        });
        } 
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/"); 
    } else {
        return res.redirect("/login");
    };
    
};
export const logout = (req, res)=>{ 
    req.session.destroy();
    return res.redirect("/");
};

export const getEditProfile = (req, res) => { return res.render("editProfile", {pageTitle: "Edit Profile"});
};
export const postEditProfile = async (req, res) => { 
    const {
            session: { user : { _id, 
                username: sessionUsername, 
                name: sessionName, 
                location: sessionLocation},}, 
            body: {username, name, location},
        } = req;
    let updateContents = [];
    if (sessionUsername !== username) {
        updateContents.push({username});
    }
    if (sessionName !== name) {
        updateContents.push({name});
    }
    if (sessionLocation !== location) {
        updateContents.push({location});
    }

    if (updateContents.length > 0){
        const usernameCheck = updateContents.map(obj => obj.username)[0];
        const nameCheck = updateContents.map(obj => obj.name)[0];
        if (usernameCheck) {
        const existsUsername = await User.findOne({ username: usernameCheck });
      
        if(existsUsername) {
            console.log("중복된 값1");
            return res.status(400).send("Already username has been taken");
        }
    }
        if(nameCheck) {
        const existsName = User.findOne({ name: nameCheck });
        
        if(existsName) {
            console.log("중복된 값2");
            return res.status(400).send("Already name has been taken");
        }
    }
    } else { 
        return res.send("There's no update");
    }
    const updatedUser = await User.findByIdAndUpdate(_id, {
        username, name, location
    }, 
    { new:true }
    );
    if (updatedUser) {
        req.session.user = updatedUser;
    }
    return res.redirect("/users/edit");
};