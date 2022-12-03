import { client } from "../../lib/sanityClient";

const query = `*[_type == "conversations" && isDm == false]{
    roomId, roomName, "avatar": image.asset->url
}`;

export default async (req, res) => {
    try {
        const sanityResponse = await client.fetch(query);
        console.log(sanityResponse);
        res.status(200).send(sanityResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
