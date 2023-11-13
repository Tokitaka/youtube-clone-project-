import Video from '../models/Video';

export const watch = async (req, res)=>{ 
    const {id} = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404",{pageTitle: "Video Not Found"});
    }
    return res.render("watch", {pageTitle: `${video.title}`, video}); 
};

export const getEdit = async (req, res)=>{ 
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404",{pageTitle: "Video Not Found"});
    } 
    return res.render("edit", {pageTitle: `Editing ${video.title}`, video});
};

export const postEdit = async (req, res)=>{ 
    const {id} = req.params;
    const {title, description, hashtags} = req.body;

    const video = await Video.exist({_id:id});
    if(!video) {
        return res.render("404",{pageTitle: "Video Not Found"});
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
		hashtags: Video.formatHashtags(hashtags), 
    }
);
    return res.redirect("/");
} catch(error){
    alert(error);
    return res.render("upload", {
        pageTitle: "Upload Video", 
        errorMessage: error._message,
    });
}
};

export const deleteVideo = (req, res) => { 
    return res.send("delete Videos")};