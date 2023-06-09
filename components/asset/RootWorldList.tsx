import Link from "next/link";
import { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import Paginator from "../Paginator";
import PlayModal from "./PlayModal";
import StarRatings from 'react-star-ratings';
import { FaEthereum } from "react-icons/fa";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";
import styles from "../../styles/card-item.module.css";
import Card from "../Card";
import OverlayImage360Button from "../image360/OverlayImage360Button";
import InfiniteList from "../marketplace/InfiniteList";

const itemPerPage = 4;

export type TemplateViewModel = {
    id?: string;
    tokenURI?: string;
    name?: string;
    description?: string;
    fileAssetUri?: string;
    fileAssetName?: string;
    fileAssetUriFromCentralized?: string;
    file2dUri?: string;
    file3dUri?: string;
    image?: string;
    rating?: number;
    animation_url?: string;
    onlineOpenable?: boolean;
    offlineOpenable?: boolean;
}

export type CreatorViewModel = {
    id: number;
    social_email?: string;
    custom_email?: string;
    wallet_address: string;
    wallet_nonce: string;
    steam_id?: string;
    name: string;
    created_at: string; // e.g. "2022-08-20T07:10:39Z"
    updated_at: string; // e.g. "2023-05-17T08:35:35Z"
}

export type RootTemplateViewModel = {
    deletable?: boolean;
} & TemplateViewModel

type ListProps = {
    data: RootTemplateViewModel[];
}

function RootWorldList({ data }: ListProps) {
    return (
        <InfiniteList items={data} />
    )
}
export default RootWorldList;