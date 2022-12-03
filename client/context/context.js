import { useRouter } from "next/router";
import { useState, useEffect, useReducer, createContext } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
// import Gun from "gun";

export const DiscordContext = createContext();

// const gun = Gun(["http://localhost:5000/"]);

const initialState = { messages: [] };

const reducer = (state, action) => {
    try {
        if (action.type === "clear") return { messages: [] };
        if (action.type === "add")
            return { messages: [...state.messages, action.data] };
    } catch (error) {
        console.errorr(error);
    }
};

const getProviderObject = async () => await detectEthereumProvider();

export const DiscordProvider = ({ children }) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [currentAccount, setCurrentAccount] = useState("");
    const [roomName, setRoomName] = useState("");
    const [placeholder, setPlaceholder] = useState("Message...");
    const [messageText, setMessageText] = useState("");
    const [currentUser, setCurrentUser] = useState();

    const createUserAccont = async (userAddress = currentAccount) => {
        try {
            const data = {
                userAddress: userAddress,
            };
 
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createuser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            } catch (error) {
                console.error(error);
            }

            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createdm`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const provider = await getProviderObject();
                if (!provider) console.error("please install metamask!");

                const accounts = await provider.request({
                    method: "eth_accounts",
                });

                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0]);
                    createUserAccont(accounts[0]);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const connectWallet = async () => {
        try {
            const provider = await getProviderObject();
            if (!provider) console.error("please install metamask!");

            const accounts = await provider.request({
                method: "eth_requestAccounts",
            });

            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
                createUserAccont(accounts[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DiscordContext.Provider
            value={{
                currentAccount,
                currentUser,
                roomName,
                placeholder,
                messageText,
                state,
                // gun,
                connectWallet,
                setRoomName,
                setMessageText,
            }}
        >
            {children}
        </DiscordContext.Provider>
    );
};
