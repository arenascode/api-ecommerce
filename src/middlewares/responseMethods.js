export const responseMiddleware = (req, res, next) => {
  // Extend the response object with custom methods
  res.sendSuccess = ( message = "Success") => {
    res.status(200).json({
      success: true,
      message: message,
    });
  };

  res.sendError = (message = "Internal Server Error", status = 500) => {
    res.status(status).json({
      success: false,
      message: message,
      status: status
    });
  };

  res.sendClientError = (error) => {
    res.status(400).json({ status: "error", error });
  };
  res.sendServerError = (error) => {
    res.status(500).json({ status: "error", error });
  };
  res.sendAuthError = (error) => {
    res.status(401).json({ status: "error", error: "You aren't authenticated. Please Authenticate First" });
  };
  res.sendPermissionError = (error) => {
    res
      .status(403)
      .json({
        status: "error",
        error: "you don't have permission to do this action",
      });
  };
  next();
};


