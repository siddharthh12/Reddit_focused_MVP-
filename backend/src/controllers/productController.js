const prisma = require("../config/db");

exports.createProduct = async (req, res) => {
    try {
        const {
            productName,
            website,
            description,
            targetAudience,
            competitors,
            brandTone,
            keywords,
        } = req.body;

        if (
            !productName ||
            !website ||
            !description ||
            !targetAudience ||
            !keywords
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        const keywordArray = keywords
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean);

        let user = await prisma.user.findFirst();

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: "demo@example.com",
                    password: "password123",
                },
            });
        }

        const product = await prisma.product.create({
            data: {
                productName,
                website,
                description,
                targetAudience,
                competitors,
                brandTone,
                userId: user.id,
            },
        });

        await prisma.keyword.createMany({
            data: keywordArray.map((keyword) => ({
                keyword,
                productId: product.id,
            })),
        });

        res.status(201).json({
            success: true,
            message: "Product onboarding completed",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

exports.getDashboardData = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                keywords: true,
            },
        });

        res.json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
