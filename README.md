# TrioSoft Pocket v0.1.1

Мобильный клиент TrioSoft на Tauri 2 + Rust + Vite с подготовленной CI-сборкой для iOS.

## Что уже есть
- mobile-first интерфейс под iPhone;
- safe-area для Dynamic Island / Home Indicator;
- нижняя навигация;
- главная, каталог приложений, события и профиль;
- поиск приложений;
- Tauri/Rust command `runtime_info`;
- web-preview без Xcode;
- база для Android и iOS из одного проекта;
- GitHub Actions сборка iOS на macOS без собственного Mac;
- отдельный режим Simulator без подписи;
- отдельный режим signed `.ipa` после добавления Apple signing secrets.

## Проверка на Windows

```bash
npm install
npm run tauri dev
```

Или только web-интерфейс:

```bash
npm install
npm run dev
```

Vite использует тот же порт `1420`, который указан в Tauri config.

## Сборка iOS через GitHub с Windows

Подробная инструкция находится в `IOS-GITHUB-ACTIONS.md`.

Коротко:

1. Загрузи проект в GitHub вместе с `.github/workflows/ios.yml`.
2. Открой **Actions -> Build iOS -> Run workflow**.
3. Выбери `simulator` — Apple Developer для этого режима не требуется.
4. Скачай готовый artifact после окончания workflow.

Для настоящего iPhone переключи `build_target` на `signed-ipa` и предварительно добавь Apple signing secrets по инструкции.

## iOS локально на Mac

```bash
npm install
npm run tauri -- ios init
npm run tauri -- ios dev
```

Чтобы открыть проект через Xcode:

```bash
npm run tauri -- ios dev --open
```

## Следующий этап
- TrioSoft ID OAuth;
- реальный API App Hub;
- push-уведомления;
- Keychain / secure storage;
- Face ID;
- полноценные страницы приложений;
- настройки темы и accent color;
- deep links;
- автоматическая отправка готовой сборки в TestFlight.
