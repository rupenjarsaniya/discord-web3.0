import React, { useState } from "react";
import { useRouter } from "next/router";
import RoomAvatar from "./RoomAvatar";
import styles from "../styles/sidebar.module.css";

import avatar1 from "../assets/avatar-1.webp";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.webp";
import avatar4 from "../assets/avatar-4.webp";

const dummyChannels = [
    {
        roomId: 1,
        name: "general",
        avatar: avatar1,
    },
    {
        roomId: 2,
        name: "random",
        avatar: avatar2,
    },
    {
        roomId: 3,
        name: "chill",
        avatar: avatar3,
    },
    {
        roomId: 4,
        name: "buildspace",
        avatar: avatar4,
    },
];

const Sidebar = () => {
    const router = useRouter();
    const [channels, setChannels] = useState(dummyChannels);

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
