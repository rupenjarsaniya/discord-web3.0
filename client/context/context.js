import { useRouter } from "next/router";
import {
    useContext,
    useState,
    useEffect,
    useReducer,
    createContext,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import gun from "gun";

export const DiscordContext = createContext();

const initialState = { messages: [] };
let provider;

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
                await fetch(`${process.env.NEXT_PUBLIC_URL}/createuser`, {
                    method: " POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            } catch (error) {
                console.error(error);
            }

            try {
                await fetch(`${process.env.NEXT_PUBLIC_URL}/createdm`, {
                    method: " POST",
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
                provider = await getProviderObject();
                if (!provider) console.error("please install metamask!");

                const accounts = provider.request({
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
            provider = await getProviderObject();
            if (!provider) console.error("please install metamask!");

            const accounts = provider.request({
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
                gun,
                connectWallet,
                setRoomName,
                setMessageText,
            }}
        >
            {children}
        </DiscordContext.Provider>
    );
};
