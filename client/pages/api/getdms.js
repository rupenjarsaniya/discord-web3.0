import { client } from "../../lib/sanityClient";

const query = `*[_type == "conversations" && isDm == true]{
    "conversations": userReference->{
        name, 
        walletAddress,  
        "image" : profileImage.asset->url
    }
}`;

export default async (req, res) => {
    try {
        const sanityResponse = await client.fetch(query);
        const formatedResponse = sanityResponse.map((item) => {
            return {
                avatar: item.conversations.image,
                name: item.conversations.name,
                walletAddress: item.conversations.walletAddress,
            };
        });
        res.status(200).send(formatedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
