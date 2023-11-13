import Video from '../models/Video';

export const see = (req, res)=>{ 
    return res.send(`Watching Videos #${req.params.id}`)
};
export const edit = (req, res)=>{ 
    return res.send("Editing Videos")};

export const home = async (req, res) => { 
    const videos = await Video.find({});
    return res.render("home", {pageTitle: "HOME", videos})
};

export const search = (req, res) => { 
    return res.send("Searching Videos")};

export const getUpload = (req, res) => { 
    return res.render("upload Videos")};

export const postUpload = async (req, res) => { 
    const { title, description, hashtags } = req.body;
    try{
    await Video.create({
		title, //title:title
		description, //description:description
		hashtags: hashtags.split(",").map(word => `#${word}`), //hashtags:hashtags
		createdAt: Date.now(),
		meta: {
				views:0,
				ratings:0,
        },
    }
);
    return res.redirect("/");
} catch{
    return res.render("upload", {pageTitle: "Upload Video"});
}

};

export const deleteVideo = (req, res) => { 
    return res.send("delete Videos")};