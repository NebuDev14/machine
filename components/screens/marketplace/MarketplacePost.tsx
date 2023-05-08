/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export const MarketplacePost = (props: any) => {
  return (
    <Link href={`/marketplace/${props.marketplacePost.id}`}>
      <div>
        <div className="border border-[#2A2A2A] bg-card hover:border-gray-600 px-5 py-5 rounded-lg relative">
          <img
            className="rounded-lg mb-4 object-contain h-[350px] w-[350px]"
            src={
              props.marketplacePost.media[0] ?? "https://picsum.photos/400/250"
            }
            alt=""
          />
          <h1 className="font-bold text-xl text-white">
            {props.marketplacePost.title}
          </h1>
          <p className="text-lightGray break-words">
            {props.marketplacePost.content}
          </p>

          <div className="flex items-center pt-3">
            <img
              className="h-10 w-10 rounded-full object-cover object-center"
              src={props.marketplacePost.author?.image}
              alt=""
            />
            <div className="mx-4">
              <h1 className="text-sm font-semibold text-white">
                {props.marketplacePost.author?.name}
              </h1>
              <Link href={`/teams/6070`}>
                <p className="text-sm text-lightGray">Team 6070</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
