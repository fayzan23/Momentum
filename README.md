# 🚀 Momentum - AI-Powered Task Management App

A beautiful, modern task management application built with React Native and Expo, featuring AI-powered personalization using OpenAI's GPT-OSS-20B model. Momentum helps you stay organized with intelligent task prioritization, voice input, and personalized recommendations.

![Momentum App](https://img.shields.io/badge/React%20Native-Expo-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![AI Powered](https://img.shields.io/badge/AI-GPT--OSS--20B-purple)

## ✨ Features

### 🎯 Core Task Management
- **Smart Priority System**: Gold, Silver, Bronze priority levels with beautiful gradient indicators
- **Time Tracking**: Estimate and track actual completion times
- **Due Dates**: Set and manage task deadlines
- **Task Completion**: Mark tasks complete with time feedback
- **Search & Filter**: Find tasks quickly with priority filtering

### 🤖 AI-Powered Intelligence
- **GPT-OSS-20B Integration**: Local AI model for natural language processing
- **Voice Input**: Add tasks using speech-to-text
- **Smart Suggestions**: AI-powered task recommendations
- **Personalized Scheduling**: Optimal task timing based on your patterns

### 👤 User Profiling
- **Adaptive Questions**: Learn about your daily routine and preferences
- **Work Schedule Integration**: Understand your working hours and commitments
- **Family Schedule Awareness**: Consider family time and pickups
- **Personalized Experience**: Customized recommendations and timing

### 🎨 Modern UI/UX
- **Beautiful Design**: Light purple/white theme with gradient accents
- **Responsive Layout**: Works perfectly on iOS and Android
- **Smooth Animations**: Delightful interactions and transitions
- **Accessibility**: Built with accessibility in mind

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **AI Model**: OpenAI GPT-OSS-20B (via Ollama)
- **Voice Processing**: Expo Speech API
- **UI Components**: Custom components with Linear Gradients
- **Icons**: Expo Vector Icons

## 📱 Screenshots

### Home Screen
- Clean dashboard with priority overview cards
- Task list with beautiful gradient priority indicators
- Search functionality and filtering options

### Add Task Screen
- Intuitive task creation form
- Beautiful priority selection with gradients
- Time estimation and due date inputs

### Profile Screen
- User information and preferences
- Question tracking and personalization settings

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **Ollama** (for AI model): [Install Ollama](https://ollama.ai/)
- **iOS Simulator** (for iOS development) or **Android Studio** (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/momentum.git
   cd momentum
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Ollama for AI features**
   ```bash
   # Install GPT-OSS-20B model
   ollama pull gpt-oss:20b
   
   # Start Ollama server
   ollama serve
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go
   - **Web**: Press `w` in the terminal

### Development Commands

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web

# Clear cache and restart
expo start --clear
```

## 🏗️ Project Structure

```
momentum/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── TaskItem.tsx    # Individual task component
│   │   └── PriorityFilter.tsx # Priority filtering component
│   ├── screens/            # App screens
│   │   ├── HomeScreen.tsx  # Main dashboard
│   │   ├── AddTaskScreen.tsx # Task creation
│   │   └── ProfileScreen.tsx # User profile
│   ├── store/              # Redux store configuration
│   │   ├── index.ts        # Store setup
│   │   └── slices/         # Redux slices
│   │       ├── taskSlice.ts # Task state management
│   │       └── userSlice.ts # User state management
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # App-wide types
│   ├── services/           # API and external services
│   └── utils/              # Utility functions
├── App.tsx                 # Main app component
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🤖 AI Integration Setup

### Ollama Configuration

1. **Install Ollama**
   ```bash
   # macOS
   brew install ollama
   
   # Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Windows
   # Download from https://ollama.ai/download
   ```

2. **Pull the GPT-OSS-20B model**
   ```bash
   ollama pull gpt-oss:20b
   ```

3. **Start Ollama server**
   ```bash
   ollama serve
   ```

4. **Test the model**
   ```bash
   ollama run gpt-oss:20b "Hello, how are you?"
   ```

### API Integration

The app will connect to Ollama's local API endpoint:
- **Base URL**: `http://localhost:11434`
- **Model**: `gpt-oss:20b`
- **Endpoints**: `/api/generate` for text generation

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradients (`#8B5CF6` to `#A855F7`)
- **Secondary**: Pink gradients (`#EC4899` to `#F472B6`)
- **Accent**: Orange gradients (`#F59E0B` to `#FBBF24`)
- **Background**: Light gray (`#F8FAFC`)
- **Text**: Dark gray (`#1F2937`)

### Priority System
- **Gold**: High priority (Purple gradient)
- **Silver**: Medium priority (Pink gradient)
- **Bronze**: Low priority (Orange gradient)

### Typography
- **Headers**: Bold, 18-24px
- **Body**: Regular, 14-16px
- **Captions**: Medium, 12-14px

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gpt-oss:20b

# App Configuration
APP_NAME=Momentum
APP_VERSION=1.0.0
```

### Redux Store

The app uses Redux Toolkit for state management:

- **Tasks**: Task CRUD operations, filtering, completion tracking
- **User**: Profile information, preferences, question tracking

## 🚀 Deployment

### Building for Production

1. **Configure app.json**
   ```json
   {
     "expo": {
       "name": "Momentum",
       "slug": "momentum",
       "version": "1.0.0",
       "platforms": ["ios", "android"],
       "icon": "./assets/icon.png",
       "splash": {
         "image": "./assets/splash.png",
         "resizeMode": "contain",
         "backgroundColor": "#F8FAFC"
       }
     }
   }
   ```

2. **Build for iOS**
   ```bash
   expo build:ios
   ```

3. **Build for Android**
   ```bash
   expo build:android
   ```

### App Store Deployment

1. **iOS App Store**
   - Build with EAS Build
   - Submit through App Store Connect

2. **Google Play Store**
   - Build with EAS Build
   - Upload to Google Play Console

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for the GPT-OSS-20B model
- **Ollama** for local AI model serving
- **Expo** for the amazing React Native platform
- **React Navigation** for smooth navigation
- **Redux Toolkit** for state management

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/momentum/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/momentum/discussions)
- **Email**: support@momentum.app

## 🔮 Roadmap

### Upcoming Features
- [ ] **Widget Support**: iOS and Android home screen widgets
- [ ] **Custom Wallpapers**: Task-based wallpaper generation
- [ ] **Team Collaboration**: Shared tasks and projects
- [ ] **Analytics**: Task completion insights and trends
- [ ] **Smart Notifications**: AI-powered reminder timing
- [ ] **Calendar Integration**: Sync with system calendars
- [ ] **Dark Mode**: Alternative dark theme option
- [ ] **Offline Support**: Full offline functionality

### AI Enhancements
- [ ] **Natural Language Processing**: Better voice command understanding
- [ ] **Predictive Scheduling**: AI-suggested optimal task timing
- [ ] **Habit Tracking**: Learn and suggest productivity patterns
- [ ] **Smart Categorization**: Auto-categorize tasks based on content

---

**Built with ❤️ for the OpenAI Hackathon**

*Momentum - Where AI meets productivity*
