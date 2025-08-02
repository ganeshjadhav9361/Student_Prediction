const performanceModel = require("../models/performanceModel.js");

exports.getPerformanceForm = async (req, res) => {
    const sid = req.params.id;

    try {
        const performance = await performanceModel.getPerformanceByStudentId(sid);
        res.render("performanceForm.ejs", { sid, performance });
    } catch (error) {
        console.error("Error fetching performance:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.submitPerformance = async (req, res) => {
    const sid = req.params.id;
    const {
        attendance_percentage,
        machine_test,
        mcq_test,
        mock_interview_score,
        final_score
    } = req.body;

    const values = [
        attendance_percentage,
        machine_test,
        mcq_test,
        mock_interview_score,
        final_score
    ];
    if (!values.every(score => !isNaN(score) && score >= 0 && score <= 100)) {
        return res.status(400).send("All scores must be numbers between 0 and 100.");
    }

    const data = {
        sid,
        attendance_percentage,
        machine_test,
        mcq_test,
        mock_interview_score,
        final_score
    };

    try {
        const existing = await performanceModel.getPerformanceByStudentId(sid);

        if (existing) {
            await performanceModel.updatePerformance(data);
        } else {
            await performanceModel.insertPerformance(data);
        }

        res.redirect(`/performance/${sid}`);
    } catch (error) {
        console.error("Error submitting performance:", error);
        res.status(500).send("Internal Server Error");
    }
};


