
import UploadImageService from "../service/uploadImage.js";

class AreaController {

    async uploadImage(req, res) {
        try {
            await UploadImageService.uploadImage();
            res.status(200).json("ok");
        } catch (error) {
            console.log(error);
        }
    }

    async uploadViolationImage(req, res) {
        try {
            await UploadImageService.uploadViolationImage();
            res.status(200).json("ok");
        } catch (error) {
            console.log(error);
        }
    }


}

export default new AreaController();