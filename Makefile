##############################
# Definitions
##############################

# USER_APPS = {index,courses,puzzle,maze,bird,turtle,movie,pond/docs,pond/tutor,pond/duck,debugging}
USER_APPS = {index,debugging}
# ALL_JSON = {./,index,courses,puzzle,maze,bird,turtle,movie,pond/docs,pond,pond/tutor,pond/duck,debugging}
ALL_JSON = {./,index,debugging}
# ALL_TEMPLATES = appengine/template.soy,appengine/index/template.soy,appengine/template.soy,appengine/courses/template.soy,appengine/puzzle/template.soy,appengine/maze/template.soy,appengine/bird/template.soy,appengine/turtle/template.soy,appengine/movie/template.soy,appengine/pond/docs/template.soy,appengine/pond/template.soy,appengine/pond/tutor/template.soy,appengine/pond/duck/template.soy,appengine/shop/template.soy,appengine/debugging/template.soy
ALL_TEMPLATES = appengine/template.soy,appengine/index/template.soy,appengine/debugging/template.soy

APP_ENGINE_THIRD_PARTY = appengine/third-party
SOY_COMPILER = java -jar third-party/SoyToJsSrcCompiler.jar --shouldProvideRequireSoyNamespaces --isUsingIjData
SOY_EXTRACTOR = java -jar third-party/SoyMsgExtractor.jar

##############################
# Rules
##############################

all: deps languages

common-zh:
	$(SOY_COMPILER) --outputPathFormat appengine/generated/zh-hant/soy.js --srcs appengine/template.soy

courses-en:
	mkdir -p appengine/generated/en/
	$(SOY_COMPILER) --outputPathFormat appengine/courses/generated/en/soy.js --srcs appengine/courses/template.soy
	python build-app.py courses en

mazealg-en: common-en
	$(SOY_COMPILER) --outputPathFormat appengine/mazealg/generated/en/soy.js --srcs appengine/mazealg/template.soy
	python build-app.py mazealg en

test-en: common-en
	$(SOY_COMPILER) --outputPathFormat appengine/test/generated/en/soy.js --srcs appengine/test/template.soy
	python build-app.py test en

test-zh: common-zh
	$(SOY_COMPILER) --outputPathFormat appengine/test/generated/zh-hant/soy.js --srcs appengine/test/template.soy
	python build-app.py test zh-hant

test: test-en test-zh

# shop-zh: common-zh
# 	$(eval TEMPLATE := appengine/shop/template.soy)
# 	$(SOY_COMPILER) --outputPathFormat appengine/shop/generated/zh-hant/soy.js --srcs $(TEMPLATE)
# 	python build-app.py shop zh-hant

extract-msgs:
	$(SOY_EXTRACTOR) --outputFile extracted_msgs.xlf --srcs $(ALL_TEMPLATES)
	i18n/xliff_to_json.py --xlf extracted_msgs.xlf --templates $(ALL_TEMPLATES)

shop-en: common-en
	mkdir -p appengine/$(APP)/public/generated
	$(SOY_COMPILER) --outputPathFormat appengine/shop/public/generated/en/soy.js --srcs appengine/shop/template.soy
	python build-app-public.py shop en

shop-i18n-en: extract-msgs
	$(eval APP := shop)
	$(eval LANG := en)
	$(eval TEMPLATE := appengine/$(APP)/template.soy)
	mkdir -p appengine/$(APP)/public/generated/$(LANG)
	i18n/json_to_js.py --path_to_jar third-party --output_dir appengine/$(APP)/public/generated --template $(TEMPLATE) --key_file json/keys.json json/$(LANG).json
	python build-app-public.py $(APP) $(LANG)

shop-i18n-zh: extract-msgs
	$(eval APP := shop)
	$(eval LANG := zh-hant)
	$(eval TEMPLATE := appengine/$(APP)/template.soy)
	mkdir -p appengine/$(APP)/public/generated/$(LANG)
	i18n/json_to_js.py --path_to_jar third-party --output_dir appengine/$(APP)/public/generated --template $(TEMPLATE) --key_file json/keys.json json/$(LANG).json
	python build-app-public.py $(APP) $(LANG)

shop: extract-msgs
	$(eval APP := shop)
	$(eval TEMPLATE := appengine/$(APP)/template.soy)
	mkdir -p appengine/$(APP)/public/generated

	$(eval LANG := en)
	mkdir -p appengine/$(APP)/public/generated/$(LANG)
	i18n/json_to_js.py --path_to_jar third-party --output_dir appengine/$(APP)/public/generated --template $(TEMPLATE) --key_file json/keys.json json/$(LANG).json
	python build-app-public.py $(APP) $(LANG)

	$(eval LANG := zh-hant)
	mkdir -p appengine/$(APP)/public/generated/$(LANG)
	i18n/json_to_js.py --path_to_jar third-party --output_dir appengine/$(APP)/public/generated --template $(TEMPLATE) --key_file json/keys.json json/$(LANG).json
	python build-app-public.py $(APP) $(LANG)

debugging-en: common-en
	mkdir -p appengine/$(APP)/public/generated
	$(SOY_COMPILER) --outputPathFormat appengine/debugging/public/generated/en/soy.js --srcs appengine/debugging/template.soy
	python build-app-public.py debugging en

debugging-i18n-en: extract-msgs
	$(eval APP := debugging)
	$(eval LANG := en)
	$(eval TEMPLATE := appengine/$(APP)/template.soy)
	mkdir -p appengine/$(APP)/public/generated/$(LANG)
	i18n/json_to_js.py --path_to_jar third-party --output_dir appengine/$(APP)/public/generated --template $(TEMPLATE) --key_file json/keys.json json/$(LANG).json
	python build-app-public.py $(APP) $(LANG)

debugging-i18n-zh: extract-msgs
	$(eval APP := debugging)
	$(eval LANG := zh-hant)
	$(eval TEMPLATE := appengine/$(APP)/template.soy)
	mkdir -p appengine/$(APP)/public/generated/$(LANG)
	i18n/json_to_js.py --path_to_jar third-party --output_dir appengine/$(APP)/public/generated --template $(TEMPLATE) --key_file json/keys.json json/$(LANG).json
	python build-app-public.py $(APP) $(LANG)

debugging: extract-msgs
	$(eval APP := debugging)
	$(eval TEMPLATE := appengine/$(APP)/template.soy)
	mkdir -p appengine/$(APP)/public/generated

	$(eval LANG := en)
	mkdir -p appengine/$(APP)/public/generated/$(LANG)
	i18n/json_to_js.py --path_to_jar third-party --output_dir appengine/$(APP)/public/generated --template $(TEMPLATE) --key_file json/keys.json json/$(LANG).json
	python build-app-public.py $(APP) $(LANG)

	$(eval LANG := zh-hant)
	mkdir -p appengine/$(APP)/public/generated/$(LANG)
	i18n/json_to_js.py --path_to_jar third-party --output_dir appengine/$(APP)/public/generated --template $(TEMPLATE) --key_file json/keys.json json/$(LANG).json
	python build-app-public.py $(APP) $(LANG)


maze-zh: common-zh
	$(SOY_COMPILER) --outputPathFormat appengine/maze/generated/zh-hant/soy.js --srcs appengine/maze/template.soy
	python build-app.py maze zh-hant



index-en:
	mkdir -p appengine/generated/en/
	$(SOY_COMPILER) --outputPathFormat appengine/index/generated/en/soy.js --srcs appengine/index/template.soy
	python build-app.py index en

puzzle-en: common-en
	$(SOY_COMPILER) --outputPathFormat appengine/puzzle/generated/en/soy.js --srcs appengine/puzzle/template.soy
	python build-app.py puzzle en

maze-en: common-en
	$(SOY_COMPILER) --outputPathFormat appengine/maze/generated/en/soy.js --srcs appengine/maze/template.soy
	python build-app.py maze en

bird-en: common-en
	$(SOY_COMPILER) --outputPathFormat appengine/bird/generated/en/soy.js --srcs appengine/bird/template.soy
	python build-app.py bird en

turtle-en: common-en
	$(SOY_COMPILER) --outputPathFormat appengine/turtle/generated/en/soy.js --srcs appengine/turtle/template.soy
	python build-app.py turtle en

movie-en: common-en
	$(SOY_COMPILER) --outputPathFormat appengine/movie/generated/en/soy.js --srcs appengine/movie/template.soy
	python build-app.py movie en

pond-docs-en:
	mkdir -p appengine/pond/generated/en/
	$(SOY_COMPILER) --outputPathFormat appengine/pond/docs/generated/en/soy.js --srcs appengine/pond/docs/template.soy
	python build-app.py pond/docs en

pond-tutor-en: pond-common-en
	$(SOY_COMPILER) --outputPathFormat appengine/pond/tutor/generated/en/soy.js --srcs appengine/pond/tutor/template.soy
	python build-app.py pond/tutor en

pond-duck-en: pond-common-en
	$(SOY_COMPILER) --outputPathFormat appengine/pond/duck/generated/en/soy.js --srcs appengine/pond/duck/template.soy
	python build-app.py pond/duck en

genetics-en: common-en
	$(SOY_COMPILER) --outputPathFormat appengine/genetics/generated/en/soy.js --srcs appengine/genetics/template.soy
	python build-app.py genetics en

pond-common-en: common-en
	$(SOY_COMPILER) --outputPathFormat appengine/pond/generated/en/soy.js --srcs appengine/pond/template.soy

common-en:
	$(SOY_COMPILER) --outputPathFormat appengine/generated/en/soy.js --srcs appengine/template.soy

en: index-en courses-en puzzle-en maze-en bird-en turtle-en movie-en pond-docs-en pond-tutor-en pond-duck-en genetics-en

languages:
	$(SOY_EXTRACTOR) --outputFile extracted_msgs.xlf --srcs $(ALL_TEMPLATES)
	i18n/xliff_to_json.py --xlf extracted_msgs.xlf --templates $(ALL_TEMPLATES)
	@for app in $(ALL_JSON); do \
	  mkdir -p appengine/$$app/generated; \
	  i18n/json_to_js.py --path_to_jar third-party --output_dir appengine/$$app/generated --template appengine/$$app/template.soy --key_file json/keys.json json/*.json; \
	done
	@for app in $(USER_APPS); do \
	  echo; \
	  echo --- $$app; \
	  for lang in `ls appengine/$$app/generated`; do \
	    python build-app.py $$app $$lang; \
	  done \
	done

deps:
	mkdir -p third-party
	@# All following commands are in third-party, use backslashes to keep them on the same line as the cd command.
	cd third-party; \
	svn checkout https://github.com/google/closure-library/trunk/closure/bin/build build; \
	wget -N https://dl.google.com/closure-templates/closure-templates-for-javascript-latest.zip; \
	unzip -o closure-templates-for-javascript-latest.zip SoyToJsSrcCompiler.jar; \
	unzip -o closure-templates-for-javascript-latest.zip -d ../$(APP_ENGINE_THIRD_PARTY) soyutils_usegoog.js; \
	wget -N https://dl.google.com/closure-templates/closure-templates-msg-extractor-latest.zip; \
	unzip -o closure-templates-msg-extractor-latest.zip SoyMsgExtractor.jar; \
	wget -N https://dl.google.com/closure-compiler/compiler-latest.zip; \
	unzip -o compiler-latest.zip -x COPYING README.md; \
	mv -f closure-compiler-v*.jar closure-compiler.jar; \
	chmod +x build/closurebuilder.py

	mkdir -p $(APP_ENGINE_THIRD_PARTY)
	svn checkout https://github.com/google/closure-library/trunk/closure/goog/ $(APP_ENGINE_THIRD_PARTY)/goog
	svn checkout https://github.com/google/closure-library/trunk/third_party/closure/goog/ $(APP_ENGINE_THIRD_PARTY)/third_party_goog
	svn checkout https://github.com/ajaxorg/ace-builds/trunk/src-min-noconflict/ $(APP_ENGINE_THIRD_PARTY)/ace
	svn checkout https://github.com/google/blockly/trunk/ $(APP_ENGINE_THIRD_PARTY)/blockly
	svn checkout https://github.com/CreateJS/SoundJS/trunk/lib/ $(APP_ENGINE_THIRD_PARTY)/SoundJS
	svn checkout https://github.com/gleitz/midi-js-soundfonts/trunk/FluidR3_GM/acoustic_guitar_nylon-mp3/ $(APP_ENGINE_THIRD_PARTY)/midi-js-soundfonts/guitar
	svn checkout https://github.com/gleitz/midi-js-soundfonts/trunk/FluidR3_GM/acoustic_grand_piano-mp3/ $(APP_ENGINE_THIRD_PARTY)/midi-js-soundfonts/piano
	svn checkout https://github.com/gleitz/midi-js-soundfonts/trunk/FluidR3_GM/banjo-mp3/ $(APP_ENGINE_THIRD_PARTY)/midi-js-soundfonts/banjo
	svn checkout https://github.com/gleitz/midi-js-soundfonts/trunk/FluidR3_GM/choir_aahs-mp3/ $(APP_ENGINE_THIRD_PARTY)/midi-js-soundfonts/choir
	svn checkout https://github.com/gleitz/midi-js-soundfonts/trunk/FluidR3_GM/flute-mp3/ $(APP_ENGINE_THIRD_PARTY)/midi-js-soundfonts/flute
	svn checkout https://github.com/gleitz/midi-js-soundfonts/trunk/FluidR3_GM/melodic_tom-mp3/ $(APP_ENGINE_THIRD_PARTY)/midi-js-soundfonts/drum
	svn checkout https://github.com/gleitz/midi-js-soundfonts/trunk/FluidR3_GM/trumpet-mp3/ $(APP_ENGINE_THIRD_PARTY)/midi-js-soundfonts/trumpet
	svn checkout https://github.com/gleitz/midi-js-soundfonts/trunk/FluidR3_GM/violin-mp3/ $(APP_ENGINE_THIRD_PARTY)/midi-js-soundfonts/violin

	@# messages.js confuses the compiler by also providing "Blockly.Msg.en".
	rm $(APP_ENGINE_THIRD_PARTY)/blockly/msg/messages.js
	svn checkout https://github.com/NeilFraser/JS-Interpreter/trunk/ $(APP_ENGINE_THIRD_PARTY)/JS-Interpreter
	java -jar third-party/closure-compiler.jar\
	 --js appengine/third-party/JS-Interpreter/acorn.js\
	 --js appengine/third-party/JS-Interpreter/interpreter.js\
	 --js_output_file appengine/third-party/JS-Interpreter/compiled.js

clean: clean-languages clean-deps

clean-languages:
	rm -rf appengine/$(ALL_JSON)/generated
	rm -f json/keys.json

clean-deps:
	rm -rf appengine/third-party
	rm -rf third-party

# Prevent non-traditional rules from exiting with no changes.
.PHONY: deps
