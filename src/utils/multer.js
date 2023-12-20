import multer from "multer";

// ** Here I tell to multer where I want storage the files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.files);
    let folder = `public/`;
    console.log(`files from multer ${JSON.stringify(file)}`);
    if (file.fieldname == "profileImg") {
      folder += "profiles";
    } else if (file.fieldname == "productImg") {
      folder += "productImages";
    } else if (file.fieldname == "documentUser") {
      folder += "documents";
    }
    cb(null, folder);
  },

  // filename make reference at final name
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + uniqueSuffix);
  },
});

export const uploader = multer({ storage: storage });
