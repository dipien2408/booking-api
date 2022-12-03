const ErrorResponse = require('./errorResponse')

const permission = async (req, res, next, model, id) => {
    let modelData = await model.findById(id);
    if(req.user.role !== "admin" && req.user.id !== modelData.user_id) {
        return next(
            new ErrorResponse(`User with that id of ${req.user.id} is not have permission to do this action `)
          )
    }
}

module.exports = permission;