import { client } from "../../lib/sanityClient";

export default async (req, res) => {
    const { userAddress } = req.body;

    const conversationDoc = {
        _type: "conversations",
        _id: `${userAddress}-dm`,
        isDm: true,
        roomId: userAddress,
        userReference: {
            _key: userAddress,
            _ref: `${userAddress}-dm`,
            _type: "reference",
        },
    };

    try {
        await client.createIfNotExists(conversationDoc);
        res.status(200).send("Successful");
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
