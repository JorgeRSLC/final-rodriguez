# Angular Tic Tac Toe Game and Leaderboard

This project is a simple, interactive Tic Tac Toe game built with Angular. It includes a leaderboard that can display either local or global player data. The project uses several Angular features, including components, services, data binding, directives, and event-driven programming with RxJS.

The project consists of two main components: `TicTacToeComponent` and `LeaderBoardComponent`, and three services: `StorageService`, `SocketIoService`, and `StorageService`.

The `TicTacToeComponent` is responsible for the game logic, while the `LeaderBoardComponent` displays a leaderboard of players. The `StorageService` manages player data in local storage and interacts with a global leaderboard API. The `SocketIoService` provides real-time, bidirectional, and event-based communication capabilities.

This README provides detailed information about the key features, methods, and usage of these components and services. Read on to learn more about how this Angular Tic Tac Toe game works.

# TicTacToeComponent

The `TicTacToeComponent` is an Angular component that implements a simple game of Tic Tac Toe. It uses the `StorageService` to update player scores and the `SocketIoService` to listen for score updates.

## Key Features

### Data Binding

The component uses interpolation, property binding, and event binding to bind data between the TypeScript code and the HTML template.

### Directives

The component uses structural directives (`*ngIf` and `*ngFor`) to manipulate the DOM based on the game state.

### Conditional Rendering

The component uses the `*ngIf` directive to conditionally render elements based on the game state.

## Methods

- `startGame()`: Starts the game.
- `userChoice(tile: Tile)`: Handles the user's choice of a tile.
- `computerChoice()`: Handles the computer's choice of a tile.
- `checkWinner()`: Checks if there is a winner.
- `resetBoard()`: Resets the board.

## View

The view uses data binding and directives to display the game state and handle user interactions:

- The `mainPlayer`'s alias is displayed using interpolation binding.
- The game status and winner are displayed using `*ngIf` for conditional rendering.
- The game board is displayed using `*ngFor` to loop through the `board` array. Each tile is a button that is disabled based on the game state and calls the `userChoice` method when clicked.
- The "Start Game" button is disabled based on the game state and calls the `startGame` method when clicked.
- The "Reset Game" button is conditionally rendered based on the game state and calls the `resetBoard` method when clicked.

This design allows the component to be highly interactive and responsive to the game state.

# LeaderBoardComponent

## Conditional Functionality for Greater Reusability

The `LeaderBoardComponent` is designed to be reusable. It can display either a local or a global leaderboard, depending on the `isGlobal` input property. This conditional functionality allows the component to be used in different contexts with minimal changes. For example, you could use the same component to display a local leaderboard on one page and a global leaderboard on another page. This design reduces code duplication and improves maintainability.

The `LeaderBoardComponent` is an Angular component that displays a leaderboard of players. It uses the `StorageService` to fetch player data and the `SocketIoService` to listen for score updates. The component can display either a local or a global leaderboard, depending on the `isGlobal` input property.

## Key Features

### Conditional Functionality

The component's functionality changes based on the `isGlobal` input property. If `isGlobal` is `true`, the component fetches global player data, listens for global leaderboard updates, and listens for score updates. If `isGlobal` is `false`, the component fetches local player data.

### Event-Driven Programming

The component uses RxJS `Subscription` to subscribe to `Observable` objects from the `StorageService` and the `SocketIoService`. It listens for changes in local storage, global leaderboard updates, and score updates.

### Resource Management

The component implements the `ngOnDestroy` lifecycle hook to unsubscribe from the `storageSubscription` when the component is destroyed, preventing memory leaks.

## Methods

- `ngOnInit()`: Initializes the component. Sets the title based on `isGlobal`, subscribes to `Observable` objects, and listens for the 'storage' event.
- `ngOnDestroy()`: Unsubscribes from the `storageSubscription`.

# StorageService

The `StorageService` is an Angular service that provides methods for managing player data in local storage and interacting with a global leaderboard API. It uses RxJS for event-driven programming.

## Key Features

### Local Storage Management

The service provides methods to get, update, and refresh player data in local storage. It uses a `BehaviorSubject` to hold the player data, allowing subscribers to get the current value as well as any future updates.

### Global Leaderboard Interaction

The service interacts with a global leaderboard API, providing methods to get global data and update the global leaderboard.

### Event-Driven Programming

The service uses RxJS `Subject` and `fromEvent` to create an event-driven programming model. It provides methods to listen for changes in local storage and to get an `Observable` of the `globalLeaderBoardUpdated` event.

## Methods

- `getGlobalData()`: Returns an `Observable` of the global data from the API.
- `updateLocalStorage(player: Player)`: Updates local storage with new player data.
- `getPlayersFromLocalStorage()`: Returns player data from local storage.
- `getPlayersSubject()`: Returns an `Observable` of the `playersSubject`.
- `updateLocalLeaderBoard(playerId: string, score: number)`: Updates local leaderboard with new score for a player.
- `refreshPlayers()`: Refreshes player data from local storage.
- `listenForStorageChanges()`: Returns an `Observable` that emits events when local storage changes.
- `updateGlobalLeaderBoard(playerId: string, score: number)`: Updates global leaderboard and triggers an event.
- `getGlobalLeaderBoardUpdated()`: Returns an `Observable` of the `globalLeaderBoardUpdated` event.

## Event Listening

The `StorageService` uses event listening to react to changes in local storage and updates to the global leaderboard. The `listenForStorageChanges()` method returns an `Observable` that emits events when local storage changes. The `updateGlobalLeaderBoard()` method triggers an event when the global leaderboard is updated. Subscribers can listen to these events and react accordingly.

# SocketIoService

The `SocketIoService` is an Angular service that provides methods for real-time, bidirectional, and event-based communication. It uses the Socket.IO library to enable real-time communication between the client and the server.

## Key Features

The `SocketIoService` is designed to be injected into other components or services, providing them with real-time communication capabilities.

## Usage

To use the `SocketIoService`, you need to import it and inject it into your component or service. You can then call its methods to send and receive real-time messages.

Note: The actual implementation of the `SocketIoService` is not shown in the provided code. The service likely provides methods for connecting to a Socket.IO server, sending messages, and subscribing to events.