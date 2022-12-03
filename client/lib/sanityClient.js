import createClient from "@sanity/client";

const { SANITY_TOKEN, SANITY_PROJECT_ID } = process.env;

export const client = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "v1",
    token: SANITY_TOKEN,
    useCdn: false,
});
