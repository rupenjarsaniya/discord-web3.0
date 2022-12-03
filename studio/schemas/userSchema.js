export default {
    name: "users",
    title: "Users",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "walletAddress",
            title: "Wallet Address",
            type: "string",
        },
        {
            name: "profileImage",
            title: "Profile Image",
            type: "image",
        },
    ],
};
