import CV from "../models/CV.js";

export const getCV = async (req, res) => {
    try {
        const cv = await CV.findOne();
        res.set({
            "Content-Type": cv.mimeType,
            "Content-Disposition": `attachment; filename="${cv.name}"`, // <-- sends filename
        });
        res.send(cv.file);
    } catch (error) {
        res.status(500).send({message: "Error fetching CV"});
    }
};

export const uploadCV = async (req, res) => {
    try {
        const {originalname, mimetype, buffer} = req.file;

        const newCV = new CV({
            name: originalname,
            mimeType: mimetype,
            file: buffer,
        });

        await newCV.save();
        res.send(newCV.file);
    } catch (error) {
        res.status(500).send({message: "Error updating CV", error: error.message});
    }
};

export const updateCV = async (req, res) => {
    try {
        const {originalname, mimetype, buffer} = req.file;

        const updatedCV = await CV.findOneAndUpdate(
            {},
            {
                name: originalname,
                mimeType: mimetype,
                file: buffer,
            },
            {new: true}
        );

        res.send(updatedCV.file);
    } catch (error) {
        res.status(500).send({message: "Error updating CV", error: error.message});
    }
};
