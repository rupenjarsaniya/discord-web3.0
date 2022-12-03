export default {
    name: "conversations",
    title: "Conversations",
    type: "document",
    fields: [
        {
            name: "roomName",
            title: "Room Name",
            type: "string",
        },
        {
            name: "roomId",
            title: "Room Id",
            type: "string",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
        },
        {
            name: "isdm",
            title: "Is DM?",
            type: "boolean",
        },
        {
            name: "userReference",
            type: "reference",
            to: [{ type: "users" }],
        },
    ],
};
