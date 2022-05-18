const errorProvider = (res, status, message) => {
    res.setHeader("Content-Type", "application/json")
    res.status(status).json({ message: message })
    return;
}

export default errorProvider