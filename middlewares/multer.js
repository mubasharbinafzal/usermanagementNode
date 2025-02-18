const multer = require("multer");

const storage = (field) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${field}`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

const fileFilter = (filters) => (req, file, cb) => {
  if (filters.some((item) => item === file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Wrong extension type"), false);
  }
};

async function addPathToBody(req, res, next) {
  if (req.files) {
    if (!Array.isArray(req.files)) {
      let files = {};
      Object.keys(req.files).map((key) => (files[key] = { files: [] }));
      for (var key in req.files) {
        req.files[key].map((file) =>
          files[key].files.push(
            file.path != undefined ? file.path.replace(/\\/g, "/") : null
          )
        );
        req.body["images"] = files;
      }
    } else {
      let files = [];
      req.files.map((file) => {
        files.push(
          file.path != undefined ? file.path.replace(/\\/g, "/") : null
        );
      });
      req.body["images"] = files;
    }
  }
  if (req.file) req.body[req.file.fieldname] = req.file.path.replace(/\\/g, "/");
  next();
}

const uploader = (folder) =>
  multer({
    storage: storage(folder),
    fileFilter: fileFilter([
      "image/png",
      "image/jpg",
      "image/jpeg",
      "application/pdf",
      "application/octet-stream",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]),
  });

module.exports = (folder, field, type = "single") => {
  return [
    type === "array"
      ? uploader(folder).array(field)
      : type === "fields"
      ? uploader(folder).fields(field)
      : uploader(folder).single(field),
    addPathToBody,
  ];
};
