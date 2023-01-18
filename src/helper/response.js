export const responseStatus = (
  res,
  status,
  message,
  data
) => {
  if (status === 200) {
    res.status(status).json({
      statusMessage: 'Success',
      success: true,
      status,
      message,
      data,
    });
  } else if (status === 400) { 
    res.status(status).json({
      statusMessage: 'Error',
      success: false,
      status,
      message,
      error: data,
    });
  } else if (status === 204) {
    res.status(200).json({
      statusMessage: 'Error',
      success: false,
      status,
      message,
      data,
    });
  } else if (status === 500) {
    res.status(status).json({
      statusMessage: 'Error',
      status,
      message,
      error: data,
    });
  } else if (status === 403) {
    res.status(status).json({
      statusMessage: 'forbidden',
      success: false,
      status,
      message,
      error: data,
    });
  } else if (status === 401) {
    res.status(status).json({
      statusMessage: 'Unauthorized',
      success: false,
      status,
      message,
      error: data,
    });
  } else if (status === 404) {
    res.status(status).json({
      statusMessage: 'Page / Record Not Found',
      success: false,
      status,
      message,
      error: data,
    });
  }
};
