import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RoomAvatar from "./RoomAvatar";
import styles from "../styles/sidebar.module.css";

const Sidebar = () => {
    const router = useRouter();
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/getchannels`
                );
                const responseJson = await response.json();
                setChannels(responseJson);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className={styles.wrapper}>
            {channels.map((channel) => (
                <RoomAvatar
                    key={channel.roomId}
                    id={channel.roomId}
                    avatar={channel.avatar}
                    name={channel.roomName}
                />
            ))}
        </div>
    );
};

export default Sidebar;
