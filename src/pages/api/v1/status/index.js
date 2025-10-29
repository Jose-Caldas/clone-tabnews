function status(request, response) {
  response.status(200).json({ StatusAPI: "API returns status code: 200" });
}

export default status;
