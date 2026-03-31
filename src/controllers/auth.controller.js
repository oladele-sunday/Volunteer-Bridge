const login = async (req, res) => {
    try {
        const { email, password, type } = req.body; // type = "admin" | "volunteer" | "donor"

        let userModel;
        if (type === "admin") userModel = User;
        else if (type === "volunteer") userModel = Volunteer;
        else if (type === "donor") userModel = Donor;
        else return res.status(400).json({ message: "Invalid user type" });

        const user = await userModel.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Include type in token
        const token = generateToken(user.id, user.role, type);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            message: "Login successful",
            token,
            user: user.toJSON() // safe object
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};