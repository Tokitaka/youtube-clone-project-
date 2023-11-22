import User from "../models/User";

export const getJoin = (req, res)=>{ res.render("join", {pageTitle: "Create Account"})};
export const postJoin = async (req, res)=>{
    const {name, email, username, password, location} = req.body;
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