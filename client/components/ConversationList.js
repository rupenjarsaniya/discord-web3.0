import styles from "../styles/conversationList.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import friends from "../assets/icons/friends.svg";
import nitro from "../assets/icons/nitro.svg";
import DmCard from "./DmCard";

const ConversationList = () => {
    const [dms, setDms] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/getdms`
                );
                const responseJson = await response.json();
                setDms(responseJson);
            })();
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div className={styles.conversations}>
            <div className={styles.conversationListTop}>
                <input
                    type="search"
                    placeholder="Find or start a conversation"
                />
            </div>
            <div className={styles.conversationsContainer}>
                <div className={styles.elementsContainer}>
                    <div className={styles.svgContainer}>
                        <Image
                            height={25}
                            width={25}
                            src={friends}
                            className={styles.svg}
                            alt="friends"
                        />
                    </div>
                    <p>Fiends</p>
                </div>
                <div className={styles.elementsContainer}>
                    <div className={styles.svgContainer}>
                        <Image
                            height={25}
                            width={25}
                            src={nitro}
                            className={styles.svg}
                            alt="nitro"
                        />
                    </div>
                    <p>Nitro</p>
                </div>
                <div className={styles.dmTitle}>DIRECT MESSAGES</div>
                {dms.map((dm, index) => (
                    <DmCard
                        key={index}
                        name={dm.name}
                        id={dm.id}
                        avatar={dm.avatar}
                        status="online"
                    />
                ))}
            </div>
        </div>
    );
};

export default ConversationList;
