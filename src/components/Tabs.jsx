import React, { useState, useEffect } from "react";

/**
 * Tabs-komponent
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
			<div
				className="ds-tabs-bar"
				style={{
					display: "flex",
					gap: "0.5rem",
					marginBottom: "-1px"
				}}
			>
				{tabs.map(tab => (
					<button
						key={tab.label}
						onClick={() => setActiveTab(tab.label)}
						style={{
							padding: "0.5rem 1.5rem",
							borderRadius: "0.5rem 0.5rem 0 0",
							border: "1px solid var(--ds-color-border-subtle)",
							borderBottom: activeTab === tab.label ? "1px solid var(--ds-color-surface-default)" : "1px solid var(--ds-color-border-subtle)",
							background: activeTab === tab.label ? "var(--ds-color-surface-default)" : "var(--ds-color-surface-subtle)",
							color: activeTab === tab.label ? "#111" : "#444",
							fontWeight: activeTab === tab.label ? 700 : 500,
							zIndex: activeTab === tab.label ? 2 : 1,
							position: "relative",
							top: activeTab === tab.label ? "1px" : "0",
							cursor: "pointer"
						}}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div
				style={{
					border: "1px solid var(--ds-color-border-subtle)",
					borderRadius: "0 0 0.75rem 0.75rem",
					background: "var(--ds-color-surface-default)",
					padding: "2rem 1rem 1rem 1rem",
					marginTop: "-1px"
				}}
			>
				{tabs.find(tab => tab.label === activeTab)?.content}
			</div>
		</div>
	);
}
