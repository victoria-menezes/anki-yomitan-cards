
// FIRST AND FINAL CURLY BRACKETS MUST BE UNCOMMENTED, IF THEY ARE COMMENTED IT IS LIKELY A LEFTOVER FROM DEBUGGING AND WILL BE FIXED
{
            
    // ## CONSTANTS
    const SENTENCE_MAX = 4;
    const SENTENCE_DATA_PREFIX = 'example-sentence';
    const ATTRIBUTE_CONTENT = 'data-sc-content';
    const ATTRIBUTE_TAG = 'data-sc-code';

    const CLASS_SENTENCE = 'sentence';
    const CLASS_TRANSLATED = 'sentence-translated';
    const CLASS_VOCAB = 'sentence-vocab';
    const CLASS_HIGHLIGHT = 'highlighted';
    const CLASS_HIDDEN = 'hidden'

    const ID_VOCAB = 'vocab';
    const ID_BACK = 'answer';
    const ID_AUDIO = 'audio';

    
    const ID_CONTAINER_MEANING = 'dictionary';
    const ID_HIDDENCONTAINER_MEANING = 'hidden-meaning'
    const ID_HIDDENCONTAINER_SENTENCE = 'hidden-sentences';
    const ID_HIDDENCONTAINER_GUIDES =  'hidden-guides';
    const ID_HIDDENCONTAINER_FUNCTION = 'hidden-function';
    const ID_HIDDENCONTAINER_ATTACHTO = 'hidden-attachTo';
    const ID_HIDDENCONTAINER_TRANSLATED = 'hidden-translated';
    
    const ID_HIDDENCONTAINER_KANJI_EXAMPLES = 'hidden-kanji-examples';
    const ID_HIDDENCONTAINER_KANJI_EXAMPLES_TRANSLATED = 'hidden-kanji-examples-meaning';
    const ID_HIDDENCONTAINER_KANJI_KUN = 'hidden-kun';
    const ID_HIDDENCONTAINER_KANJI_ON = 'hidden-on';
    const ID_HIDDENCONTAINER_KANJI_LOOKALIKES = 'hidden-lookalikes';
    const ID_HIDDENCONTAINER_KANJI_LOOKALIKES_MEANING = 'hidden-lookalikes-meaning';

    const ID_CONTAINER_KANJI_EXAMPLES = 'kanji-examples';
    const ID_CONTAINER_KANJI_EXAMPLES_TRANSLATED = 'kanji-examples-translated';
    const ID_CONTAINER_KANJI_KUN = 'kanji-kun';
    const ID_CONTAINER_KANJI_ON = 'kanji-on';
    const ID_CONTAINER_KANJI_LOOKALIKES = 'kanji-lookalikes';
    const ID_CONTAINER_KANJI_LOOKALIKES_MEANING = 'kanji-lookalikes-meaning';

    const ID_CONTAINER_SENTENCE_FRONT = 'front-sentences-container';
    const ID_CONTAINER_SENTENCE_BACK = 'back-sentences-container';    
    const ID_CONTAINER_TRANSLATED = 'translated-container';
    
    const ID_CONTAINER_TAGS = 'back-attributes-container';
    const ID_CONTAINER_ATTACHTO = 'back-attachto-container';


    
    const HEADER_BUTTONS_TAB = {
        'btn-dictionary':'tab-dictionary',
        'btn-notes':'tab-notes',
        'btn-forming':'tab-forming',
        'btn-main':'tab-main',
        'btn-lookalikes':'tab-lookalikes'
    }
    
    const TAGS = {
        'adj-no':['の adjective','adj'],
        'adj-na':['な adjective','adj'],
        'adj-i':['い adjective','adj'],
        'adv':['adverb','adv'],
        'uk':['かな','misc'],
        'n':['noun','noun'],
        'exp':['expression','misc'],
        'v1':['1-dan verb','verb'],
        'vi':['intranstive verb','verb'],
        'vt':['transtive verb','verb'],
        'vs':['する verb','verb'],
        'vs-i':['する verb','verb'],
        'vs-s':['する verb','verb'],
        'v5s':['5-dan','verb'],
        'v5r':['5-dan','verb'],
        'v5y':['5-dan','verb'],
        'v5m':['5-dan','verb'],
        'v5h':['5-dan','verb'],
        'v5f':['5-dan','verb'],
        'v5b':['5-dan','verb'],
        'v5n':['5-dan','verb'],
        'v5t':['5-dan','verb'],
        'v5s':['5-dan','verb'],
        'v5k':['5-dan','verb'],
        'v5u':['5-dan','verb'],
        'aux-v':['auxiliary verb','verb'],
        'col':['colloquial','misc'],
        'n-suf':['suffix','su-prefix'],
        'suf':['suffix','su-prefix'],
        'pref':['prefix','su-prefix'],
        'prt':['particle','particle'],
        'conj':['conjunction', 'misc'],
        'forms':['hidden','hidden'],
        'int':['interjection','misc'],
        'adj-pn':['adjectival','adj'],
        'aux':['auxiliary', 'misc'],
        'auxiliary':['auxiliary', 'misc']
    }
    
    const FUNCTION_CLASS = {
        'adverb':'adv',
        'adjective':'adj',
        'verb':'verb',
        'particle':'particle',
        'expression':'misc',
        'noun':'noun'
    }

    const ATTACH_CLASS = {
        'as-is':['as is', 'as-is'],
        'as is':['as is', 'as-is'],
        'stem':['stem', 'stem'],
        'attributive':['attributive', 'attributive'],
        'a':['あ', 'a'],
        'ta':['た', 'ta'],
        'da':['だ', 'da'],
        'だ':['だ', 'da'],
        'た':['た', 'ta'],
        'て':['て', 'te'],
        'te':['て', 'te'],
        'e':['え', 'e'],
        'え':['え', 'e'],
        'nai':['ない', 'nai'],
        'nai stem':['ない stem', 'nai-stem'],
        'misc':['misc', 'misc'],
        'particle':['particle','particle'],
        'nominalized':['nominalized','nominalized'],
        'o':['お', 'o'],
        'お':['お', 'o'],
        'ou':['おう', 'ou'],
        'おう':['おう', 'ou'],
        undefined:[undefined,undefined]
    }

    // ## FUNCTIONS
    function changeDisplayById(id, display_text) {
        document.getElementById(id).style.display=display_text;
    }

    function changeDisplayByClass(class_name, display_text) {
        let list = document.getElementsByClassName(class_name);
        for (let i = 0; i < list.length; i++) {
            list[i].style.display=display_text;
        }
    }

    function getChildrenByAttribute(searchIn, attributeName, attributeValue) {
        let docFragment = document.createDocumentFragment();
        for (let i = 0; i<searchIn.length; i++) {
            let elem = searchIn[i];
            if (elem.hasAttribute(attributeName)) {
                if(elem.dataset.scContent==attributeValue) {
                    docFragment.appendChild(elem.cloneNode(true));
                    // .cloneNode(true) means it wont move the element, it'll clone it elsewhere
                }  
            }
        }
        return [docFragment, docFragment.children] // DocFragment, HTMLCollection
    }

    function cloneCollection(collection) {
        let docFragment = document.createDocumentFragment();
        for (let i = 0; i < collection.length; i++) {
            let elem = collection[i];
            docFragment.appendChild(elem.cloneNode(true));
        }
        return [docFragment, docFragment.children]
    }

    function populateSentences(
        idNewContainer, 
        collectionSentences, 
        collectionTranslated, 
        convertSpan=false, 
        addClassToRt=false, 
        rtClass=CLASS_HIDDEN, 
        classSentence=CLASS_SENTENCE, 
        classTranslated=CLASS_TRANSLATED)
    {
        //console.log('populating');

        // cloning it because otherwise changes will apply to the source
        let collectionSentencesCopy = cloneCollection(collectionSentences)[1]; 
        let collectionTranslatedCopy = cloneCollection(collectionTranslated)[1];
        

        // container that will receive the sentences
        let sentencesContainer = document.getElementById(idNewContainer)

        for(let i = 0; i < collectionSentencesCopy.length; i++) {
            let span = collectionSentencesCopy[i].getElementsByTagName('span')[0];
            
            // converts <span> to <b>
            try{
                if(convertSpan) {
                    let highlightedText ="";
                    highlightedText = document.createElement('b')
                    //highlightedText.classList.add(CLASSHIGHLIGHT);
                    highlightedText.innerHTML = span.innerHTML;
                    collectionSentencesCopy[i].replaceChild(highlightedText, span);
                }
    
                // adds a class to all ruby text
                if(addClassToRt) {
                    let rtCollection = collectionSentencesCopy[i].getElementsByTagName('rt');
                    for (let i = 0; i < rtCollection.length; i++) {
                        rtCollection[i].classList.add(rtClass);
                    }
                }
                //console.log('ADDING:')
                //console.log(collectionTranslated[i])
    
                sentencesContainer.innerHTML+=
                '<div class="'+classSentence+'">'+
                collectionSentencesCopy[i].innerHTML+
                '</div>'+
                '<div class="'+classTranslated+'">'+
                collectionTranslatedCopy[i].innerHTML+
                '</div>'
                
                //console.log(i)
                //console.log(newContainer.innerHTML)
            } catch (error) {
                console.log('FAILED TO POPULATE');
                try {
                    console.log('SENTENCES: '+ collectionSentencesCopy[i].innerHTML);
                    console.log('TRANSLATION: '+ collectionTranslatedCopy[i].innerHTML);
                    console.log('Possible causes: No <span> tag on dictionary');
                } catch (error) {
                    console.log('NO INNER HTML ON LIST ITEM')
                }
                console.log(error)
                console.log('---')
            }
        }

        // applying the highlight tag
        let boldList = sentencesContainer.querySelectorAll('b');
        for (var i = 0; i < boldList.length; i++) {
            boldList[i].classList.add(CLASS_HIGHLIGHT);
        }
    }

    function hideById(id) {
        document.getElementById(id).style.display='none';
    }

    function showById(id, display_text) {
        document.getElementById(id).style.display=display_text;
    }

    function hideByClass(class_name) {
        let list = document.getElementsByClassName(class_name);
        for (let i = 0; i < list.length; i++) {
            list[i].style.display='none';
        }
    }

    function showByClass(className, displayText) {
        let list = document.getElementsByClassName(className);
        for (let i = 0; i < list.length; i++) {
            list[i].style.display=displayText;
        }
    }

    function showByTag(tag, displayText) {
        let list = document.querySelectorAll(tag);
        for (let i = 0; i < list.length; i++) {
            list[i].style.display=displayText;
        }
    }

    function addClassByTag(tag, className, searchIn=document) {
        let list = searchIn.querySelectorAll(tag);
        let classes = className.split(' ');
        for (let i = 0; i < list.length; i++) {
            classes.forEach(classItem => list[i].classList.add(classItem))
        }
    }

    function addClassByClass(classReference, className) {     
        let list = document.getElementsByClassName(classReference);
        let classes = className.split(' ');
        for (let i = 0; i < list.length; i++) {
            classes.forEach(classItem => list[i].classList.add(classItem))
        }
    }

    function removeClassByTag(tag, className, searchIn=document) {
        let list = searchIn.querySelectorAll(tag);
        let classes = className.split(' ');
        for (let i = 0; i < list.length; i++) {
            classes.forEach(classItem => list[i].classList.remove(classItem))
        }
    }

    function removeClassByClass(classReference, className) {     
        let list = document.getElementsByClassName(classReference);
        let classes = className.split(' ');
        for (let i = 0; i < list.length; i++) {
            classes.forEach(classItem => list[i].classList.remove(classItem))
        }
    }

    function setActive(id) {
        document.getElementById(id).classList.add('link-active');
    }
    
    function setInactive(id) {
        document.getElementById(id).classList.remove('link-active')
    }
    

    function setOnlyActive(id) {
        for (let i = 0; i<Object.keys(HEADER_BUTTONS_TAB).length; i++) {
            try{
                setInactive(Object.keys(HEADER_BUTTONS_TAB)[i]);
            } catch (error) {
                console.log('Did not find button '+Object.keys(HEADER_BUTTONS_TAB)[i]);
            }
        }
        setActive(id);
    }

    function chooseTab(btn_id, display_text) {
        setOnlyActive(btn_id);
        for (let i = 0; i<Object.values(HEADER_BUTTONS_TAB).length; i++) {
            try {
                hideById(Object.values(HEADER_BUTTONS_TAB)[i]);
            } catch (error) {
                console.log('Did not find tab '+Object.values(HEADER_BUTTONS_TAB)[i])
            }
        }
        document.getElementById(HEADER_BUTTONS_TAB[btn_id]).style.display=display_text;
    }

    function hideBack() {
        document.getElementById(ID_BACK).classList.add(CLASS_HIDDEN);
    }

    function addTagsFromDictionary() {
        try {
            let tagsCollection = document.getElementsByClassName('yomitan-glossary')[0].querySelectorAll('['+ATTRIBUTE_TAG+']');
            let addedTags = [];
            for (let i = 0; i < tagsCollection.length; i++) {
                try{
                    let attribute = tagsCollection[i].getAttribute(ATTRIBUTE_TAG);
                    let tagList = TAGS[attribute][0].split(" ");
                    let superTag = TAGS[attribute][1];
                    if(!(addedTags.includes(attribute))) {
                        if(tagList.length>1) {
                            for (let i = tagList.length-1; i >= 0; i--) {    
                                let newTag = document.createElement('div');
                                newTag.innerHTML = tagList[i];
                                newTag.classList.add('tag');
                                if(i < tagList.length-1) {
                                    newTag.classList.add(attribute); // don't add specific class in the parent tag
                                }
                                newTag.classList.add(superTag);
                                document.getElementById(ID_CONTAINER_TAGS).appendChild(newTag);
                            }
                        } else {
                            let newTag = document.createElement('div');
                            newTag.innerHTML = TAGS[attribute][0];
                            newTag.classList.add('tag');
                            newTag.classList.add(superTag);
                            document.getElementById(ID_CONTAINER_TAGS).appendChild(newTag)   
                        }
                        addedTags.push(attribute);
                    }
                } catch (error) {
                    console.log('FAILED TO FETCH OR ADD TAG FROM DICTIONARY');
                    console.log('TAG:' + tagsCollection[i]);
                    console.log('TAG ATTRIBUTE:' + tagsCollection[i].getAttribute(ATTRIBUTE_TAG));
                    console.log(error);
                    console.log('---')
                }
            }
        } catch (error) {
            console.log('FAILED TO FIND ATTRIBUTE TAGS');
        }
    }

    /**
         * Converts a HTMLCollection into an Array
         * @param {HTMLCollection} collection 
         * @returns {Array}
         */
    const collectionToArray = (collection) => {
        for (var array=[], i=collection.length; i;) array[--i] = collection[i];
        return array
    }

    /**
     * Converts a NodeList into an Array
     * @param {NodeList} nodeList 
     * @returns {Array}
     */
    const nodeListToArray = (nodeList) => {
        for (var array=[], i=nodeList.length; i;) array[--i] = nodeList[i];
        return array
    }

    /**
     * Turns every non-element item of the array into an item. Drops empty items
     * @param {Array} array 
     * @param {String} tag Default li 
     * @returns 
     */
    const ensureArrayItems = (array, tag = 'li', allowEmpty = true) =>{
        let newArray = []
        if (allowEmpty) {
            try {
                array.forEach(item => {
                    let element = item;
                    if (typeof item.innerHTML !== 'string') {
                        // if innerHTML is not a string, ie if it's undefined or similar
                        // meaning it has no innerHTML and is therefore not an object
                        element = document.createElement(tag);
                        element.innerHTML=item;
                        newArray.push(element)
                    } else if (!(item.innerHTML === '')) {
                        // if it IS a string and it's not empty
                        // pushes the item without alteration
                        newArray.push(element)
                    }
                })
                return newArray;
            } catch (error) {
                return []
            }
        }
        else {            
            array.forEach(item => {
                let element = item;
                if (typeof item.innerHTML !== 'string') {
                    // if innerHTML is not a string, ie if it's undefined or similar
                    // meaning it has no innerHTML and is therefore not an object
                    element = document.createElement(tag);
                    element.innerHTML=item;
                    newArray.push(element)
                } else if (!(item.innerHTML === '')) {
                    // if it IS a string and it's not empty
                    // pushes the item without alteration
                    newArray.push(element)
                }
            })
            return newArray;
            }
    }
    
    /**
     * Generates a Regex expression that will separate elements by the tags given
     * @param {Array.<String>} tags 
     * @returns {RegExp}
     */
    const regexFromTags = tags => {
        let exp = new RegExp('');
        
        for (let i = 0; i < tags.length; i++){
            let tag = tags[i]
            let expression = ''
            if (['br'].includes(tag)){
                expression = new RegExp('(?<=(\\<'+tag+'\\>))((.|\\n)*?)(?=\\<'+tag+')');
                if (i === 0) {
                    exp = expression;
                } else {
                    exp = new RegExp(exp.source  + '|' +  expression.source);
                }
            }
            else {
                expression = new RegExp('(?<=(\\<'+tag+'\\>))((.|\\n)*?)(?=\\<\\/'+tag+'>)');
                if (i === 0) {
                    exp = expression;
                } else {
                    exp = new RegExp(exp.source + '|' + expression.source);
                }
            }
        }
        exp = new RegExp(exp.source, "g");
        return exp;
    }

    /**
     * Gets a list from a string separated by the given html tag
     * @param {String} html 
     * @param {Array.<String>} tags
     * @returns {Array.<String>}
     */
    const separateBySpecificTags = (html, tags) => {
        let toSearch = html;
        toSearch = '<br>'.concat(toSearch.concat('<br>'));
        expr = regexFromTags(tags);
        
        // console.log('separateBySpecificTags')
        // console.log(expr)

        return toSearch.match(regexFromTags(tags));
    }
    
    /**
     * Gets a list from an element, separated by br, li and div tags
     * @param {Object} element - Where to search
     * 
     * @returns {NodeList} List of li elements
     * @throws Error if element is empty, unless allowEmpty
     */
    const getItemsFromElement = (element, allowEmpty = true) => {         
        if (!allowEmpty & (element.innerHTML === '' | element.innerHTML === undefined)) {
            console.log('WARNING: Element is empty');
            return []
        }
        elementCopy = element.cloneNode(true);
        let items = separateBySpecificTags(elementCopy.innerHTML, ['br','li','div']);

        try {
            items = ensureArrayItems(items);
            return items;
        } catch (error) {
            return [];
        }
    }

    /**
     * Gets items from an element separated by a specific string
     * @param {Object} element 
     * @param {String} separator default: , 
     * 
     * @returns {Array}
     * @throws Error if element is empty, unless allowEmpty
     */
    const getItemsFromElementCSV = (element, separator=',', allowEmpty = true) => {
        if (!allowEmpty & (element.innerHTML === '')) {
            throw new TypeError('Element is empty')
        }
        let text = element.innerHTML;
        text = text.replaceAll(' ','');
        return text.split(separator);
    }

    /**
     * Attaches items of array to a new container.
     * @param {Array} array 
     * @param {Object} newContainer 
     * @param {Boolean} wrapUl If true, wraps the items in ul tag
     * @param {Boolean} clone If true, clones the items instead of simply appending them
     */

    const populateFromArray = (array, newContainer, wrapUl=false, clone=true, allowEmpty=true) =>{
        let receptor = newContainer;

        if(wrapUl) {
            let newUl = document.createElement('ul');
            newContainer.appendChild(newUl);
            receptor = newUl;
        }

        if (allowEmpty){
            try {        
                array.forEach(item => receptor.appendChild(item.cloneNode(clone)))
            } catch (error) {
                return
            }
        } else {
            array.forEach(item => receptor.appendChild(item.cloneNode(clone)))
        }
    };

    /**
     * Goes through every element in the array and adds a class
     * @param {Array.<Object>} array Array of elements
     * @param {String} className Classes separated by spaces
     * @returns {Array}
     */
    const addClassToArrayItems = (array, className) => {
        
        // console.log(className);
        // console.log(typeof className)
        let classes = className.split(' ');
        
        array.forEach(item => 
            classes.forEach(classItem => item.classList.add(classItem))
        );
        return array;
    }

    
    /**
     * Populates the target element with a list of elements from the source, split by line breaks, divs or lis
     * @param {Object} target Element to populate
     * @param {Object} source Element to draw list items from
     * @param {String} className Class to be added to list items, will be skipped if left blank
     * @param {String} elemType Type of elements to be made from items drawn from source, default li
     * @param {Boolean} wrapUl Wrap the added elements in a ul element, default true
     */
    const populateFromElement = (
        target,
        source, 
        className = '',
        elemType = 'li',
        wrapUl = true) => 
    {
        // console.log('getting elements from '+ target);
        let list = nodeListToArray(getItemsFromElement(source));
        list = ensureArrayItems(list, elemType); // makes sure every item in the array is an element
        if (className !== '') { // if there is a class to be added
            list = addClassToArrayItems(list, className);
        }
        populateFromArray(
            list,
            target,
            wrapUl
        );
    }

    /**
     * Populates the target element with a list of elements from the source, split by a separator
     * @param {Object} target Element to populate
     * @param {Array} source Element to draw list items from
     * @param {Array} classNames Classes to apply to the populated items
     * @param {String} elemType Type of elements to be made from items drawn from source, default li
     * @param {Boolean} wrapUl Wrap the added elements in a ul element, default true
     */
    const populateFromCSV = (
        target,
        source, 
        classNames,
        elemType = 'li',
        wrapUl = true
        ) => 
    {
        let list = nodeListToArray(getItemsFromElementCSV(source));
        list = ensureArrayItems(list, elemType); // makes sure every item in the array is an element
        if (className !== '') { // if there is a class to be added
            list = addClassToArrayItems(list, className);
        }
        populateFromArray(
            list,
            target,
            wrapUl
        );
    }

    const convertArrayItems = (
        array,
        tag
    ) =>
    {
        let newArray = []
        array.forEach(item => {
            if (typeof item.innerHTML !== 'string') {
                // if it's not a string, ie if it's undefined or similar
                // meaning it has no innerHTML and is therefore not an object
                // (plain text, for example)
                let element = document.createElement(tag);
                element.innerHTML=item;
                newArray.push(element)
            } else if (!(item.innerHTML === '')) {
                // if innerHTML IS a string and it's not empty
                let element = document.createElement(tag);
                element.innerHTML = item.innerHTML;
                newArray.push(element)
            }
        })
        return newArray;
    }

    /**
     * Populates the target grid with a list of elements from the source, split by line breaks, divs or lis
     * @param {Object} target Element to populate
     * @param {Array.<Object>} sources Array of objects to draw items from, in the desired order
     * @param {Array.<String>} className Class to be added to list items, will be skipped if left blank
     * @param {String} elemType Type of elements to be made from items drawn from source, default div
     * @param {Boolean} rows Transpose the grid (currently not functional), default false
     */
    const populateGridFromElement = (
        target,
        sources,
        className,
        elemType = 'div',
        rows = false
        ) => 
    {
        if (sources.length < 2){
            throw new TypeError('sources must be an array with length > 1')
        }

        const listOfElementArrays = [];
        const fileAmount = sources.length;
        
        // 'file' refers to either column or row, depending on bool rows

        sources.forEach(item => {
            listOfElementArrays.push(nodeListToArray(getItemsFromElement(item)));
        })

        for (let i = 0; i < listOfElementArrays.length; i++) {
            // for each array in the list of arrays, convert its items to elemType
            listOfElementArrays[i] = convertArrayItems(listOfElementArrays[i], elemType);
            if ((className[i] !== undefined) & className[i] !== '') { // if there is a class to be added
                listOfElementArrays[i] = addClassToArrayItems(listOfElementArrays[i], className[i]);
            }
        }


        let transversalAmount = 0;
        listOfElementArrays.forEach(array => {
            transversalAmount = Math.max(transversalAmount, array.length);
        });

        // grid will be of size fileAmount x transversalAmount

        const cellAmount = fileAmount * transversalAmount;
        let filePosition = 0;
        let transversalPosition = 0;
        let item;


        for (let i = 0; i < cellAmount; i++){
            filePosition = i % fileAmount; // refers to the current file
            transversalPosition = Math.floor(i / fileAmount);
            item = listOfElementArrays[filePosition][transversalPosition];
            
            // console.log(item);
            // console.log('row ' + transversalPosition + ' | column ' + filePosition);
            try {
                target.appendChild(item);
            }
            catch (error){
                console.log('Skipping ' + item);
            }
        }
    }

    /**
     * Searches for a word in an element and wraps every instance of that word in a span tag 
     * @param {String} word Word to wrap inside span
     * @param {Object} searchIn Element to search in
     * @param {Array.<String>} className Classes to be added to the span, separated by spaces
     */
    const addClassAroundWord = (
        word,
        searchIn,
        className=''
    ) => {
        // adding span tag:
        let innerContent = searchIn;
        innerContent.innerHTML = innerContent.innerHTML.replaceAll(word, '<span>'+word+'</span>');

        // selecting ALL span tags
        let spanList = innerContent.querySelectorAll('span');
        
        // narrowing it down to only the ones with the right content
        let elementList = [];
        spanList.forEach(span => {
            if (span.innerHTML === word){
                elementList.push(span);
            }
        })

        if (className !== ''){
            addClassToArrayItems(elementList, className);
        }
    }

    // #### BY CARD TYPE
    function buildStandardCard() {
        // ## HIDING VOCAB FURIGANA
        vocabRuby = document.getElementById(ID_VOCAB).querySelector('rt')
        if (vocabRuby != null) {
            vocabRuby.classList.add(CLASS_HIDDEN);
        }

        // ## SENTENCE FETCHING
        // ## SENTENCE FETCHING: FROM FIELDS
        let sentenceContainer = document.getElementById(ID_HIDDENCONTAINER_SENTENCE);
        let sentenceHtml = sentenceContainer.innerHTML;

        sentenceContainer.innerHTML = '<ul><li>'+sentenceHtml.replaceAll('<br>','<li>')+'</li></ul>';
        let sentenceList = sentenceContainer.getElementsByTagName('li');

        let translatedContainer = document.getElementById(ID_HIDDENCONTAINER_TRANSLATED);
        let translatedHtml = translatedContainer.innerHTML;
        translatedContainer.innerHTML = '<ul><li>'+translatedHtml.replaceAll('<br>','<li>')+'</li></ul>';
        let translatedList = translatedContainer.getElementsByTagName('li');
        
        populateSentences(
            ID_CONTAINER_SENTENCE_FRONT, 
            sentenceList, 
            translatedList, 
            false, 
            true,
            CLASS_HIDDEN,
            CLASS_SENTENCE,
            CLASS_TRANSLATED+' hidden');
        populateSentences(
            ID_CONTAINER_SENTENCE_BACK, 
            sentenceList, 
            translatedList, 
            false, 
            false);
        
        // ## SENTENCE FETCHING: FROM DICTIONARY
        // example-sentence-a is the untranslated sentence
        // example-sentence-b is the translated sentence
        // example-sentence is the container with both

        // get sentence containers
        let meaningContainer = document.getElementById(ID_CONTAINER_MEANING);


        let containerCollection = meaningContainer.querySelectorAll('['+ATTRIBUTE_CONTENT+'='+SENTENCE_DATA_PREFIX+']');

        // from the sentence containers, get the original sentences and the translated sentences
        let sentenceFragment = document.createDocumentFragment()
        let translatedFragment = document.createDocumentFragment()
        for (let i = 0; i < Math.min(containerCollection.length,SENTENCE_MAX); i++) {
            // since HTMLCollections can't be edited directly,
            // create a documentFragment and append the children to it and later make a HTMLCollection from that
            sentenceFragment.append(getChildrenByAttribute(containerCollection[i].children, ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-a')[0]);
            translatedFragment.append(getChildrenByAttribute(containerCollection[i].children, ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-b')[0]);
        }
        let sentenceCollection = sentenceFragment.children;
        let translatedCollection = translatedFragment.children;

        populateSentences(
            ID_CONTAINER_SENTENCE_FRONT, 
            sentenceCollection, 
            translatedCollection, 
            true, 
            true,
            CLASS_HIDDEN,
            CLASS_SENTENCE,
            CLASS_TRANSLATED+' hidden');
        populateSentences(
            ID_CONTAINER_SENTENCE_BACK,  
            sentenceCollection, 
            translatedCollection, 
            true, 
            false);

        addTagsFromDictionary();
    }

    function buildFillInCard() {
        // ## SENTENCE FETCHING
        // ## SENTENCE FETCHING: FROM FIELDS
        let sentenceContainer = document.getElementById(ID_HIDDENCONTAINER_SENTENCE);
        let sentenceHtml = sentenceContainer.innerHTML;

        sentenceContainer.innerHTML = '<ul><li>'+sentenceHtml.replaceAll('<br>','<li>')+'</li></ul>';
        let sentenceList = sentenceContainer.getElementsByTagName('li');

        let translatedContainer = document.getElementById(ID_HIDDENCONTAINER_TRANSLATED);
        let translatedHtml = translatedContainer.innerHTML;
        translatedContainer.innerHTML = '<ul><li>'+translatedHtml.replaceAll('<br>','<li>')+'</li></ul>';
        let translatedList = translatedContainer.getElementsByTagName('li');
        
        populateSentences(
            ID_CONTAINER_SENTENCE_FRONT, 
            sentenceList, 
            translatedList, 
            false, 
            true,
            CLASS_HIDDEN,
            CLASS_SENTENCE,
            CLASS_TRANSLATED);
        populateSentences(
            ID_CONTAINER_SENTENCE_BACK, 
            sentenceList, 
            translatedList, 
            false, 
            false);
        
        // ## SENTENCE FETCHING: FROM DICTIONARY
        // example-sentence-a is the untranslated sentence
        // example-sentence-b is the translated sentence
        // example-sentence is the container with both

        // get sentence containers
        let meaningContainer = document.getElementById(ID_CONTAINER_MEANING);


        let containerCollection = meaningContainer.querySelectorAll('['+ATTRIBUTE_CONTENT+'='+SENTENCE_DATA_PREFIX+']');

        // from the sentence containers, get the original sentences and the translated sentences
        let sentenceFragment = document.createDocumentFragment()
        let translatedFragment = document.createDocumentFragment()
        for (let i = 0; i < Math.min(containerCollection.length,SENTENCE_MAX); i++) {
            // since HTMLCollections can't be edited directly,
            // create a documentFragment and append the children to it and later make a HTMLCollection from that
            sentenceFragment.append(getChildrenByAttribute(containerCollection[i].children, ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-a')[0]);
            translatedFragment.append(getChildrenByAttribute(containerCollection[i].children, ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-b')[0]);
        }
        let sentenceCollection = sentenceFragment.children;
        let translatedCollection = translatedFragment.children;

        populateSentences(
            ID_CONTAINER_SENTENCE_FRONT, 
            sentenceCollection, 
            translatedCollection, 
            true, 
            true,
            CLASS_HIDDEN,
            CLASS_SENTENCE,
            CLASS_TRANSLATED);
        populateSentences(
            ID_CONTAINER_SENTENCE_BACK,  
            sentenceCollection, 
            translatedCollection, 
            true, 
            false);

            
        
        addTagsFromDictionary();
   
    }

    function linebreaksToItems(element, tag="") {
        element.innerHTML = '<ul><li>'+ element.innerHTML.replaceAll('<br>', '<li>') + '</li></ul>';
        return element.querySelectorAll('li');
    }

    function buildGrammarCard() {
        let grammarSentences = document.getElementById(ID_HIDDENCONTAINER_SENTENCE);
        grammarSentences = linebreaksToItems(grammarSentences);
        let grammarSentencesGuides = document.getElementById(ID_HIDDENCONTAINER_GUIDES);
        grammarSentencesGuides = linebreaksToItems(grammarSentencesGuides);
        let grammarSentencesTranslated = document.getElementById(ID_HIDDENCONTAINER_TRANSLATED);
        grammarSentencesTranslated = linebreaksToItems(grammarSentencesTranslated);

        let container = document.getElementById(ID_CONTAINER_SENTENCE_FRONT);
        for (let i = 0; i < grammarSentences.length; i++) {
            container.innerHTML+=
                '<div class="border-top">'+
                '<div class="'+CLASS_SENTENCE+'">'+
                '<div class="redacted">'+
                grammarSentences[i].innerHTML +
                '</div>'+
                '<div class="sentence-guides">'+
                '(<b>'+
                grammarSentencesGuides[i].innerHTML +
                '</b>)'+
                '</div>'+
                '</div>'+
                '<div class="sentence-translated">'+
                grammarSentencesTranslated[i].innerHTML+
                '</div>'+
                '</div>';
        }
        addClassByTag('b', 'highlighted', container);
        addClassByTag('rt', 'hidden', container);
        addClassByClass('sentence-translated', 'hidden');
        
        container = document.getElementById(ID_CONTAINER_SENTENCE_BACK);
        for (let i = 0; i < grammarSentences.length; i++) {
            container.innerHTML+=
                '<div class="notes-sentences border-top">'+
                '<div class="'+CLASS_SENTENCE+'">'+
                '<div class="">'+
                grammarSentences[i].innerHTML +
                '</div>'+
                '</div>'+
                '<div class="sentence-translated">'+
                grammarSentencesTranslated[i].innerHTML+
                '</div>'+
                '</div>';
        }

        let functionList = document.getElementById(ID_HIDDENCONTAINER_FUNCTION);
        functionList = linebreaksToItems(functionList);

        if (functionList[0].innerHTML != '') {
            for(let i = 0; i < functionList.length; i++) {
                try{
                    let tag = document.createElement('div');
                    tag.innerHTML=functionList[i].innerHTML;
                    tag.classList.add('tag');
                    tag.classList.add(FUNCTION_CLASS[tag.innerHTML]);
                    document.getElementById(ID_CONTAINER_TAGS).appendChild(tag);
                } catch(error) {
                    console.log('FAILED TO ADD FUNCTION TAG');
                    try {console.log('TAG:' + functionList[i].innerHTML);}
                    catch (error) {console.log('FAILED TO READ TAG HTML.')}
                    console.log(error);
                    console.log('---')
                }
            }
        }
        

        let attachList = document.getElementById(ID_HIDDENCONTAINER_ATTACHTO);
        attachList = linebreaksToItems(attachList);

        if (attachList[0].innerHTML != '') { 
            for(let i = 0; i < attachList.length; i++) {
                try{
                    let text = ATTACH_CLASS[attachList[i].innerHTML][0];
                    let tag = document.createElement('div');
                    tag.innerHTML=text;
                    tag.classList.add('tag');
                    tag.classList.add('tag-attach');
                    tag.classList.add(ATTACH_CLASS[attachList[i].innerHTML][1]);
                    document.getElementById(ID_CONTAINER_ATTACHTO).appendChild(tag);
                } catch (error) {
                    console.log('FAILED TO ADD ATTACH TAG');
                    console.log('ITEM: '+attachList[i])
                    try{console.log('TAG: '+attachList[i].innerHTML)}
                    catch (error) {
                        console.log('NO INNER HTML')
                    }
                    console.log(error);
                    console.log('---')
                }
            }
        }
    }

    function buildKanjiCard() {        
        populateFromElement(
            target =  document.getElementById(ID_CONTAINER_MEANING),
            source = document.getElementsByClassName('yomitan-glossary')[0].childNodes[0],
            className = 'meaning-item'
        )

        populateFromCSV(
            target = document.getElementById(ID_CONTAINER_KANJI_ON),
            source = document.getElementById(ID_HIDDENCONTAINER_KANJI_ON),
            className = 'kanji-readings-item',
            elemType= 'div',
            wrapUl = false,
        )
        
        populateFromCSV(
            target = document.getElementById(ID_CONTAINER_KANJI_KUN),
            source = document.getElementById(ID_HIDDENCONTAINER_KANJI_KUN),
            className = 'kanji-readings-item',
            elemType= 'div',
            wrapUl = false,
        )
        
        populateGridFromElement(            
            target =  document.getElementById(ID_CONTAINER_KANJI_EXAMPLES),
            source = [document.getElementById(ID_HIDDENCONTAINER_KANJI_EXAMPLES), 
                document.getElementById(ID_HIDDENCONTAINER_KANJI_EXAMPLES_TRANSLATED)],
            classNames = ['kanji-examples-item example border-bottom border-thin', 'kanji-examples-item translated border-bottom border-thin']
        )

        populateGridFromElement(
            target= document.getElementById(ID_CONTAINER_KANJI_LOOKALIKES),
            source= [document.getElementById(ID_HIDDENCONTAINER_KANJI_LOOKALIKES), 
                document.getElementById(ID_HIDDENCONTAINER_KANJI_LOOKALIKES_MEANING)],
            className = ['kanji-examples-item example', 'kanji-examples-item translated']
        )


        let character = document.getElementById(ID_VOCAB).innerHTML;
        addClassAroundWord(character, document.getElementById('kanji-examples'), 'highlight')
    }

    // #### CALLING FUNCTION

    // CALL ONLY THE RELEVANT CARD, COMMENT THE REST
    //buildStandardCard();
    //buildFillInCard();
    //buildGrammarCard();
    //buildKanjiCard();

    // UNCOMMENT BELOW LINE IF FRONT-SIDE
    //hideBack(); 
}