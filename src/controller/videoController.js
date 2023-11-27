import Video from "../models/Video";
import User from "../models/User";

export const watch = async (req, res)=>{ 
    const {id} = req.params;
    const video = await Video.findById(id).populate("owner");
    if (!video) {
        return res.status(404).render("404",{pageTitle: "Video Not Found"});
    }
    return res.render("videos/watch", {pageTitle: `${video.title}`, video}); 
};

export const getEdit = async (req, res)=>{ 
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404",{pageTitle: "Video Not Found"});
    } 
    return res.render("edit", {pageTitle: `Editing ${video.title}`, video});
};

export const postEdit = async (req, res)=>{ 
    const {id} = req.params;
    const {user: {_id}} = req.session;
    const {title, description, hashtags} = req.body;

    const video = await Video.exist({_id:id});
    if(!video) {
        return res.status(404).render("404",{pageTitle: "Video Not Found"});
    }

    if(String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }

    await Video.findByIdAndUpdate(id, {
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        }
    );
        return res.redirect("/");
};

export const home = async (req, res) => { 
    const videos = await Video.find({});
    return res.render("home", {pageTitle: "HOME", videos});
};

export const search = async (req, res) => { 
    const {keyword} = req.query;
    let videos = [];
    if(keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i")
            },
        });
    }
    return res.render("search", {pageTitle: "Search", videos});
};

export const getUpload = (req, res) => { 
    return res.render("videos/upload")};

export const postUpload = async (req, res) => { 
    const {body: { title, description, hashtags }, file: {path: fileUrl}, session:{user:_id}} 
    = req;
    try{
   const newVideo = await Video.create({
        fileUrl,
		title,
		description, 
		hashtags: Video.formatHashtags(hashtags), 
        owner:_id,
    }
);
    const user = await User.findById(_id);
    user.videos.push(newVideo);
    user.save();
    return res.redirect("/");
} catch(error){
    console.log(error)
    return res.status(400).render("videos/upload", {
        pageTitle: "Upload Video", 
        errorMessage: error._message,
    });
}
};

export const deleteVideo = async (req, res) => { 
    const {id} = req.params;
    const {user: {_id}} = req.session;
    const video = await Video.exist({_id:id});
    if(!video) {
        return res.status(404).render("404", {pageTitle: "Video Not Found"})
    }
    if(String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};