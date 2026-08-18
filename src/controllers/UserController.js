
export const getAllUser = (req, res, next) => {
    const { id, name, price } = req.query || {};
    try {
        res.status(200).json({
            success: true,
            data: [
                { id: 1, name: "Teo", age: 20 },
                { id: 2, name: "Ty", age: 21 }
            ],
            product: { id, name, price }
        });
    } catch (error) {
        next(error);
    }
}