import User from "../models/User";

export const getJoin = (req, res)=>{ res.render("join", {pageTitle: "Create Account"})};
export const postJoin = async (req, res)=>{
    const {name, email, username, password, password2, location} = req.body;
    const pageTitle = "Join";
    if(password != password2){ 
        return res.render("join", {
            pageTitle, 
            errorMessage: "Password confirmation does not match",
        });
}
	const exists = await User.exists({$or: [{username},{email}]});
    if(exists) {
	return res.render("join", {
	pageTitle,
	errorMessage:"This username/emial is already taken.",
})}

    await User.create({
        name, email, username, password, location
    });
    return res.redirect("/login");
 };

export const login = (req, res)=>{ res.send("Logining user")};
export const edit = (req, res)=>{ res.send("Editing user")};
export const remove = (req, res)=>{ res.send("Removing user")};
export const see = (req, res)=>{ res.send("Seeing user")};
export const logout = (req, res)=>{ res.send("Log out user")};