//import todo model
const Todo = require("../models/Todo");

//define route handler
exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        await Todo.findByIdAndDelete(id);

        res.json({
            success: true,
            message : "Todo deleted successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error",
          });
    }
}