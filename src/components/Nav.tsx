import React from "react";
import { mazeAlgorithmName, pathAlgorithmName } from "./PathFinder";

export default function Navbar({
	selectedPathAlgorithmName,
	selectedMazeAlgorithmName,
  setSelectedPathAlgorithmName,
  setSelectedMazeAlgorithmName,
  actions
}: any) {
	const [navbarOpen, setNavbarOpen] = React.useState(false);
	const [dropdownOpen, setDropDownOpen] = React.useState(false);
	const [dropdownAOpen, setDropDownAOpen] = React.useState(false);

	return (
		<div className="z-50 fixed top-0 w-full text-white bg-regal-blue dark-mode:text-white dark-mode:bg-purple-400">
			<div className="flex flex-col max-w-screen-xl px-4 mx-auto xl:items-center xl:justify-between xl:flex-row xl:px-6 xl:px-8">
				<div className="p-4 flex flex-row items-center justify-between">
					<a
						href="#"
						className="text-xl font-semibold tracking-widest text-white uppercase rounded-xl dark-mode:text-white focus:outline-none focus:shadow-outline"
					>
						Pathfinder
					</a>
					<button
						className="xl:hidden rounded-xl focus:outline-none focus:shadow-outline"
						onClick={() => setNavbarOpen(!navbarOpen)}
					>
						<svg
							fill="currentColor"
							viewBox="0 0 20 20"
							className="w-6 h-6"
						>
							<path
								style={{
									visibility: !navbarOpen
										? "visible"
										: "hidden",
								}}
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
								clipRule="evenodd"
							></path>
							<path
								style={{
									visibility: navbarOpen
										? "visible"
										: "hidden",
								}}
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
				</div>
				<nav
					className={`${
						navbarOpen ? "flex" : "hidden"
					} flex-col flex-grow pb-4 xl:pb-0 xl:flex xl:justify-end xl:flex-row`}
				>
					<a
						className="xl:ml-4 cursor-pointer px-4 py-2 mt-2 text-sm font-semibold text-white bg-indigo-400 rounded-xl dark-mode:bg-indigo-700 dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
						onClick={() => actions.pathPlan.action()}
					>
						{ actions.pathPlan.name }
					</a>
          <a
						className="xl:ml-4 cursor-pointer px-4 py-2 mt-2 text-sm font-semibold text-white bg-indigo-400 rounded-xl dark-mode:bg-indigo-700 dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
						onClick={() => actions.generateMaze.action()}
					>
						{ actions.generateMaze.name }
					</a>
					<a
						className="cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 xl:ml-4 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
						onClick={() => actions.resetBoard.action()}
					>
						{ actions.resetBoard.name }
					</a>
					<a
						className="cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 xl:ml-4 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
						onClick={() => actions.clearPath.action()}
					>
						{ actions.clearPath.name }
					</a>
					<a
						className="cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 xl:ml-4 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
						onClick={() => actions.clearObstacles.action()}
					>
						{ actions.clearObstacles.name }
					</a>
					<div
						onClick={() => setDropDownOpen(!dropdownOpen)}
						className="relative"
					>
						<button
							onClick={() => setDropDownOpen(!dropdownOpen)}
							className="text-red flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-indigo-600 dark-mode:hover:bg-indigo-600 xl:w-auto xl:inline xl:mt-0 xl:ml-4 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
						>
							<span>{selectedPathAlgorithmName}</span>
							<svg
								fill="currentColor"
								viewBox="0 0 20 20"
								className={`${
									dropdownOpen ? "rotate-180" : "rotate-0"
								} m-0 inline w-4 h-4 transition-transform duration-200 transform xl:-mt-1"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd`}
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
						<div
							className={`${
								dropdownOpen ? "" : "hidden"
							} absolute right-0 w-full mt-2 origin-top-right rounded-xl shadow-xl xl:w-48`}
              style={{zIndex: 1000}}
						>
							<div className="px-2 py-2 bg-regal-blue rounded-xl shadow dark-mode:bg-indigo-800">
								<a
									className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
									onClick={() => setSelectedPathAlgorithmName(pathAlgorithmName.ASTAR)}
								>
									{ pathAlgorithmName.ASTAR }
								</a>
								<a
									className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
									onClick={() => setSelectedPathAlgorithmName(pathAlgorithmName.DJIKSTRA)}
								>
									{ pathAlgorithmName.DJIKSTRA }
								</a>
								<a
									className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
									onClick={() => setSelectedPathAlgorithmName(pathAlgorithmName.GREEDY)}
								>
									{ pathAlgorithmName.GREEDY }
								</a>
								<a
									className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
									onClick={() => setSelectedPathAlgorithmName(pathAlgorithmName.SWARM)}
								>
									{ pathAlgorithmName.SWARM }
								</a>
								<a
									className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
									onClick={() => setSelectedPathAlgorithmName(pathAlgorithmName.BFS)}
								>
									{ pathAlgorithmName.BFS }
								</a>
								<a
									className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
									onClick={() => setSelectedPathAlgorithmName(pathAlgorithmName.BIDIRECTIONAL_BFS)}
								>
									{ pathAlgorithmName.BIDIRECTIONAL_BFS }
								</a>
								<a
									className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
									onClick={() => setSelectedPathAlgorithmName(pathAlgorithmName.DFS)}
								>
									{ pathAlgorithmName.DFS }
								</a>
							</div>
						</div>
					</div>
					<div
						onClick={() => setDropDownAOpen(!dropdownAOpen)}
						className="relative"
					>
						<button
							onClick={() => setDropDownAOpen(!dropdownAOpen)}
							className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-indigo-600 dark-mode:hover:bg-indigo-600 xl:w-auto xl:inline xl:mt-0 xl:ml-4 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
						>
							<span>{selectedMazeAlgorithmName}</span>
							<svg
								fill="currentColor"
								viewBox="0 0 20 20"
								className={`${
									dropdownAOpen ? "rotate-180" : "rotate-0"
								} m-0 inline w-4 h-4 transition-transform duration-200 transform xl:-mt-1"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd`}
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
						<div
							className={`${
								dropdownAOpen ? "" : "hidden"
							} absolute right-0 w-full mt-2 origin-top-right rounded-xl shadow-xl xl:w-48`}
              style={{zIndex: 1000}}
						>
							<div className="px-2 py-2 bg-regal-blue rounded-xl shadow dark-mode:bg-indigo-800">
								<a
									className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
									onClick={() => setSelectedMazeAlgorithmName(mazeAlgorithmName.RECURSIVE_BACKTRACKER)}
								>
									{ mazeAlgorithmName.RECURSIVE_BACKTRACKER }
								</a>
								<a
									className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-xl dark-mode:bg-transparent dark-mode:hover:bg-indigo-600 dark-mode:focus:bg-indigo-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-white-200 xl:mt-0 hover:text-white focus:text-white hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline"
									onClick={() => setSelectedMazeAlgorithmName(mazeAlgorithmName.RANDOM)}
								>
									{ mazeAlgorithmName.RANDOM }
								</a>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
}

// x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95"
