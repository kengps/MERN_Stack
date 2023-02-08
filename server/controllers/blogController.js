//บันทึกข้อมูล
exports.create = (req ,res) => {
    res.json({
        data: req.body
    })
}