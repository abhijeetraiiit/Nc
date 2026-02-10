# Nc Mobile App

Flutter mobile application for iOS and Android.

## Project Structure

```
mobile/
├── lib/
│   ├── main.dart           # App entry point
│   ├── screens/            # UI screens
│   ├── widgets/            # Reusable widgets
│   ├── services/           # API services
│   ├── models/             # Data models
│   └── theme/              # Neubrutalism theme
├── android/                # Android-specific code
├── ios/                    # iOS-specific code
├── pubspec.yaml            # Dependencies
└── README.md              # This file
```

## Features (Planned)

- 🎨 Neubrutalism design matching web app
- 🗣️ Voice commerce in 12+ Indian languages
- 📱 Native mobile experience
- 🔔 Push notifications
- 📍 Location-based recommendations
- 💬 WhatsApp checkout integration
- 🌐 Offline-first architecture

## Setup Instructions

### Prerequisites

1. Install Flutter SDK (3.16.0 or higher)
2. Install Android Studio / Xcode
3. Install Dart plugin

### Installation

```bash
# Get Flutter dependencies
flutter pub get

# Run on emulator/device
flutter run

# Build for Android
flutter build apk

# Build for iOS
flutter build ios
```

## Design System

The mobile app uses the same Neubrutalism design tokens as the web platform:

- **Colors**: Black (#000000), Hot Pink (#FF3366), Mint Green (#00FF88)
- **Typography**: Inter Variable font
- **Shadows**: Bold offset shadows (8dp 8dp)
- **Borders**: Thick 4dp borders

## API Integration

The app connects to the NestJS microservices via the API Gateway:

- Base URL: `https://api.nc-ecommerce.in`
- Authentication: JWT tokens
- GraphQL & REST endpoints

## State Management

Using **Riverpod** for state management:

- User state
- Cart state
- Product catalog
- Order tracking

## Localization

Support for 12+ Indian languages:

- English (en)
- Hindi (hi)
- Bengali (bn)
- Telugu (te)
- Marathi (mr)
- Tamil (ta)
- And more...

## Voice Commerce

Integration with Google Speech-to-Text API for vernacular voice search:

- Hinglish support
- Intent extraction
- Voice-based product discovery

## Development Status

🏗️ **Placeholder** - Full implementation coming soon

Current status:
- [x] Project structure defined
- [ ] UI implementation
- [ ] API integration
- [ ] Voice commerce
- [ ] WhatsApp checkout
- [ ] Push notifications

## Testing

```bash
# Run unit tests
flutter test

# Run integration tests
flutter test integration_test

# Run widget tests
flutter test test/widgets
```

## Contributing

Please follow the Flutter style guide and ensure all tests pass before submitting PRs.

## License

Proprietary - All rights reserved
