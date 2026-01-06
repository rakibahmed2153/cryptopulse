import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {fetcher} from "@/lib/coingeko.action";
import DataTable from "@/components/DataTable";
import { cn } from "@/lib/utils";
import {TrendingDown, TrendingUp} from "lucide-react";

const columns: DataTableColumn<TrendingCoin>[] = [
    {
        header: `Name`,
        cellClassName: `name-cell`,
        cell: (coin) => {
            const item = coin.item;
            return (
                <Link href={`/coin/${item.id}`} key={item.id}>
                    <Image src={item.large} alt={item.name} width={36} height={36} />
                    <p>{item.name}</p>
                </Link>
            )
        },
    },
    {
        header: `24h Change`,
        cellClassName: `name-cell`,
        cell: (coin) => {
            const item = coin.item;
            const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
            return (
                <div className={cn(`price-change`, isTrendingUp? 'text-green-500' : `text-red-500`)}>
                    <p>
                        {isTrendingUp? (
                            <TrendingUp width={36} height={36} />
                        ) : (
                            <TrendingDown width={36} height={36} />
                        )}
                        {Math.abs(item.data.price_change_percentage_24h.usd).toFixed(2)}%
                    </p>
                </div>
            )
        },
    },
    {
        header: `Price`,
        cellClassName: `price-cell`,
        cell: (coin) => coin.item.data.price
    },
]
//
// const dummyTrendingCoins: TrendingCoin[] = [
//     {
//         item: {
//             id: `1`,
//             name: `bitcoin`,
//             symbol: `BTC`,
//             market_cap_rank: 1,
//             thumb: `/assets/logo.svg`,
//             large: `/assets/logo.svg`,
//             data: {
//                 price: 891123.0,
//                 price_change_percentage_24h: {
//                     usd: 2.5,
//                 }
//             }
//         }
//     },
//     {
//         item: {
//             id: `2`,
//             name: `ethereum`,
//             symbol: `Ethereum`,
//             market_cap_rank: 2,
//             thumb: `/assets/logo.svg`,
//             large: `/assets/logo.svg`,
//             data: {
//                 price: 25000.0,
//                 price_change_percentage_24h: {
//                     usd: -1.25,
//                 }
//             }
//         }
//     }
// ]

const TrendingCoins = async () => {

    const trendingCoins = await fetcher< {coins: TrendingCoin[]}>(
        '/search/trending', undefined, 300);

    return (
        <div id="trending-coins">
            <h4>Trending Coins</h4>

            <div id="trending-coins">
                <DataTable
                    data={trendingCoins.coins.slice(0,6) || []}
                    columns={columns}
                    rowKey={(coin) => coin.item.id}
                    tableClassName="trending-coins-table"
                    headerCellClassName="py-3!"
                    bodyCellClassName="py-2!"
                />
            </div>
        </div>
    )
}
export default TrendingCoins
