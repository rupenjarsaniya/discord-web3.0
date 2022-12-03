import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/roomAvatar.module.css";
import Image from "next/image";

const RoomAvatar = ({ id, avatar, name }) => {
    const router = useRouter();

    const changeUrl = () => {
        router.push(``);
    };

    return (
        <div className={styles.wrapper} onClick={changeUrl}>
            <div className={styles.roomAvatar}>
                <Image
                    src={avatar}
                    className={styles.roomAvatarImage}
                    height={48}
                    width={48}
                    alt="{name}"
                />
            </div>
        </div>
    );
};

export default RoomAvatar;
