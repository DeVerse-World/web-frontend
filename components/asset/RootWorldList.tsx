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
};

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
};

export type RootTemplateViewModel = {
  deletable?: boolean;
} & TemplateViewModel;

type ListProps = {
  data: RootTemplateViewModel[];
  cardType: string;
};

function RootWorldList({ data, ...props }: ListProps) {
  return <InfiniteList items={data} {...props} />;
}
export default RootWorldList;
