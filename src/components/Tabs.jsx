import React, { useState, useEffect } from "react";
import { Tabs as DsTabs } from "@digdir/designsystemet-react";

/**
 * Tabs-komponent (DS)
 * @param {Array<{ label: string, content: React.ReactNode }>} tabs
 * @param {string} initialTab
 */
export default function Tabs({ tabs, initialTab }) {
	const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.label);
	useEffect(() => {
		setActiveTab(initialTab || tabs[0]?.label);
	}, [initialTab, tabs]);

		return (
			<div>
				<DsTabs value={activeTab} onChange={setActiveTab} style={{ marginBottom: 16 }} size="large">
					{tabs.map(tab => (
						<DsTabs.Tab key={tab.label} value={tab.label} label={tab.label} />
					))}
				</DsTabs>
				<div style={{ marginTop: 16 }}>
					{tabs.find(tab => tab.label === activeTab)?.content}
				</div>
			</div>
		);
}
