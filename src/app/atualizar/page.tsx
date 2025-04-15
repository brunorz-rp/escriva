"use client";

import { useState } from "react";
import UpdateStockCard from "../ui/atualizar/update-stock-card";
import UpdateDetailedStockCard from "../ui/atualizar/update-detailed-stock-card";
import UpdateSellOrdersCard from "../ui/atualizar/update-sell-orders-card";
import UpdateBuyOrdersCard from "../ui/atualizar/update-buy-orders-card";


export default function Atualizações() {
	const [isSomeoneUpdating, setSomeoneUpdating] = useState(false);

	return (
		<div className="h-dvh flex flex-col bg-blue-950">
			<div className="min-h-16 flex items-center p-12">
				<h1 className="text-2xl font-bold text-white">Atualizações</h1>
			</div>

			<div className="h-dvh flex flex-col justify-center">
				<div className="min-h-52 p-12">
					<UpdateStockCard
						isSomeoneUpdating={isSomeoneUpdating}
						setSomeoneUpdating={setSomeoneUpdating}
					/>
				</div>

				<div className="min-h-52 p-12">
					<UpdateDetailedStockCard
						isSomeoneUpdating={isSomeoneUpdating}
						setSomeoneUpdating={setSomeoneUpdating}
					/>
				</div>

				<div className="min-h-52 p-12">
					<UpdateBuyOrdersCard
						isSomeoneUpdating={isSomeoneUpdating}
						setSomeoneUpdating={setSomeoneUpdating}
					/>
				</div>

				<div className="min-h-52 p-12">
					<UpdateSellOrdersCard
						isSomeoneUpdating={isSomeoneUpdating}
						setSomeoneUpdating={setSomeoneUpdating}
					/>
				</div>
			</div>
		</div>
	);
}
