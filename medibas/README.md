# Medības – mednieku eksāmens

An iPhone web app for learning the Latvian hunter exam (VMD mednieku eksāmens):
965 exam questions plus 49 picture questions (tracks, droppings, birds), in Latvian.

- 🎯 **Mācīties**: rounds of 20 – your mistakes first, then new questions
- 📝 **Eksāmena simulācija**: 60 random questions, 90-minute timer, jump between questions, results with corrections
- 🐾 **Bildes**: picture questions (the animal photo is shown after you answer)
- ❌ **Manas kļūdas**, ⭐ **Atzīmētie**, 📚 **Pa blokiem** (1–50, 51–100 …), 🔍 search all questions with answers

A question counts as learned after 2 correct answers in a row. Progress stays on the phone (localStorage).

Questions come from medības.lv (`questions.js`, rebuilt with `tools/extract.js` + `tools/build.js`).
The photos are not stored in this repository: on first launch the app downloads them from medības.lv
and keeps them on the phone, so after that it works offline.

Open **https://annijama.github.io/MyGoalz/medibas/** in Safari → Share → Add to Home Screen.
