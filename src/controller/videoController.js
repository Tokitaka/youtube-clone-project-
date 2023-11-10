export const see = (req, res)=>{ 
    return res.send(`Watching Videos #${req.params.id}`)
};
export const edit = (req, res)=>{ res.send("Editing Videos")};
export const trending = (req, res) => { res.send("Trending Videos")};
export const search = (req, res) => { res.send("Searching Videos")};
export const upload = (req, res) => { res.send("upload Videos")};
export const deleteVideo = (req, res) => { res.send("delete Videos")};