# iOS build on GitHub Actions

Этот проект умеет собирать iOS-версию на GitHub-hosted macOS runner, даже если основная разработка идёт на Windows.

## Вариант 1 — iOS Simulator без Apple Developer

1. Создай репозиторий на GitHub и загрузи **всё содержимое проекта**, включая скрытую папку `.github`.
2. Открой вкладку **Actions**.
3. Выбери workflow **Build iOS**.
4. Нажми **Run workflow**.
5. `build_target` оставь `simulator`.
6. После успешной сборки открой запуск workflow и скачай artifact **TrioSoft-Pocket-iOS-Simulator**.

Это ZIP с `.app` для iOS Simulator. Его нельзя установить на обычный iPhone — для физического устройства нужна подписанная сборка.

## Вариант 2 — подписанный IPA

Для установки на физические устройства / дальнейшей публикации понадобится Apple Developer Program и корректные signing assets.

В GitHub открой:

`Repository -> Settings -> Secrets and variables -> Actions -> New repository secret`

Добавь:

- `APPLE_DEVELOPMENT_TEAM` — Team ID Apple Developer.
- `IOS_CERTIFICATE` — `.p12` сертификат, закодированный в Base64.
- `IOS_CERTIFICATE_PASSWORD` — пароль от экспортированного `.p12`.
- `IOS_MOBILE_PROVISION` — `.mobileprovision`, закодированный в Base64.

После этого:

1. **Actions -> Build iOS -> Run workflow**.
2. `build_target`: `signed-ipa`.
3. Для TestFlight обычно выбери `release-testing`.
4. Для App Store Connect distribution можно выбрать `app-store-connect`.
5. После сборки скачай artifact **TrioSoft-Pocket-signed-IPA**.

Bundle ID проекта: `xyz.triosoft.pocket`. App ID / Provisioning Profile должны соответствовать этому идентификатору. Если Bundle ID меняется, поменяй его также в `src-tauri/tauri.conf.json`.

## Как получить Base64 на macOS

Сертификат `.p12`:

```bash
base64 -i certificate.p12 | pbcopy
```

Provisioning Profile:

```bash
base64 -i profile.mobileprovision | pbcopy
```

Получившееся значение вставляется целиком в соответствующий GitHub Secret.

## Что делает workflow

- запускается вручную, чтобы не тратить macOS Actions minutes на каждый commit;
- использует GitHub-hosted `macos-26` runner;
- устанавливает Node.js 22 и Rust;
- кэширует Rust build;
- выполняет `tauri ios init --ci`;
- для Simulator собирает target `aarch64-sim`;
- для реального iPhone создаёт подписанный `aarch64` IPA;
- сохраняет готовый результат как GitHub Actions artifact.
