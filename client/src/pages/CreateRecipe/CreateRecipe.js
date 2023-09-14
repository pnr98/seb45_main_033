import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { BodyContiner, MainContainer, FormContainer, Thumbnail, ButtonContainer, CurrentIngredients, RecipeContainer, IngredientContianer, TagContainer, TagBoxContainer, Tag, CreateButton, InformationMessage } from './CreateRecipe.styled'
import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import axios from 'axios';

export default function CreateRecipe() {
    const [showModal, setShowModal] = useState(false);
    const [createModal, setCreateModal] = useState(false)
    const [thumbnail, setThumbnail] = useState('')

    // 썸네일 업로드
    const dragOverHandle = (e) => {
        e.preventDefault();
    };
    const dropHandle = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                const imageUrl = URL.createObjectURL(file);
                setThumbnail(imageUrl)
            } else {
                setShowModal(true)
            }
        }
    }
    const inputBtnhandle = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                const imageUrl = URL.createObjectURL(file);
                setThumbnail(imageUrl)
            } else {
                setShowModal(true)
            }   
        }
    }
    const resetThumbnail = () => {
        setThumbnail('')
    }

    // 카테고리 선택
    const categories = {
        categoryTag: ["한식", "중식", "일식", "양식", "디저트", "다이어트"],
        timeTag: [10, 20, 30, 40, 50, 60],
        levelTag: ["상", "중", "하"],
    };
    // 모든 선택이 완료되면 true, 그렇지 않으면 false
    const [selectedTags, setSelectedTags] = useState({
        category: null,
        time: null,
        level: null,
    })
    const handleTagClick = (type, value) => {
        setSelectedTags((prevSelectedTags) => ({
            ...prevSelectedTags,
            [type]: value,
        }))
        console.log("선택된 카테고리:", value);
        console.log("선택된 카테고리:", selectedTags.category);
        console.log("선택된 시간:", selectedTags.time);
        console.log("선택된 레벨:", selectedTags.level);
    }

    // 재료
    const [ingredients, setIngredients] = useState([])
    const [ingredientsInput, setIngredientsInput] = useState('')
    const [duplicationErr, setDuplicationErr] = useState(false)
    const gapRegex = /^\S+$/
    const spaceHandle = (e) => {
        if (e.key === " " && gapRegex.test(ingredientsInput.slice(0, ingredientsInput.length - 1))) {
            if (!ingredients.includes(ingredientsInput.slice(0, ingredientsInput.length - 1))) {
                setIngredients([...ingredients, ingredientsInput.slice(0, ingredientsInput.length - 1)])
                console.log(ingredients)
                setIngredientsInput('')
            } else {
                setDuplicationErr(true)
            }
        }
        if (e.key === 'Enter' && gapRegex.test(ingredientsInput.slice(0, ingredientsInput.length - 1))) {
            if (!ingredients.includes(ingredientsInput)) {
                setIngredients([...ingredients, ingredientsInput])
                console.log(ingredients)
                setIngredientsInput('')
            } else {
                setDuplicationErr(true)
            }
        }
        if (e.key === 'Backspace') {
            setDuplicationErr(false)
        }
    }
    const deleteTag = (tag) => {
        const newArr = ingredients.filter((el) => el !== tag)
        setIngredients(newArr)
    }

    // recipe step
    const [recipeContents, setRecipeContents] = useState({
        title: "",
        description: "",
        steps: [],
    })
    const handleOnChange = (e, field) => {
        setRecipeContents({
            ...recipeContents,
            [field]: e.target.value,
        })
        console.log(`${field} : ${e.target.value}`)
    }
    // 레시피 내용 변경
    const handleStepChange = (e, idx) => {
        const updatedSteps = [...recipeContents.steps];
        updatedSteps[idx] = e.target.value
        setRecipeContents({
            ...recipeContents,
            steps: updatedSteps,
        })
    }
    // step 추가
    const addStep = () => {
        setRecipeContents((prevRecipeContent) => ({
            ...prevRecipeContent,
            steps: [...prevRecipeContent.steps,
            {
                stepContent: "", // 빈 단계 생성
            },]
        }))
    };
    // step 삭제
    const deleteStep = (idx) => {
        setRecipeContents((prevRecipeContent) => {
            const updatedSteps = [...recipeContents.steps];
            updatedSteps.splice(idx, 1) // 해당 인덱스의 단계 삭제
            return {
                ...prevRecipeContent,
                steps: updatedSteps, // 업데이트된 단계 배열로 업데이트
            }
        })
    };

    // 등록버튼
    const isSubmitEnabled = 
        selectedTags.category && 
        selectedTags.time && 
        selectedTags.level &&
        recipeContents.title.trim() !== "" &&
        recipeContents.description.trim() !== "" &&
        thumbnail !== "" &&
        recipeContents.steps.length > 2 &&
        ingredients.length > 0;

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const requestData = {
            "foodType": selectedTags.category,
            "difficulty": selectedTags.level,
            "recipeName": recipeContents.title,
            "recipeDescription": recipeContents.description,
            "cookingTime": selectedTags.time,
            "ingredients": ingredients,
            "steps": recipeContents.steps.map((step, idx) => ({
                stepNumber: idx + 1,
                stepContent: step.stepContent,
            }))
        };
        console.log(requestData);
        try {
            if (isSubmitEnabled) {
                // 선택된 카테고리, 시간, 레벨을 서버에 전달하여 글을 생성하는 로직을 구현
                const header = {
                    Headers: {
                        Authorization: `Bearer {Token}`
                    }
                }
                const response = await axios.post(`recipe`, requestData, header)
                if (response.status === 201) {
                    setCreateModal(true)
                }
            }
        } catch (err) {
            console.error("레시피 등록 요청 실패:", err);
            console.log(requestData)
            setCreateModal(true)
        }
    }

    return (
        <BodyContiner>
            {showModal && <Modal type='Badextension' func={() => setShowModal(false)} />}
            {createModal && <Modal type='Create' func={() => setShowModal(false)} />}
            <MainContainer>
                <h1>Spread your recipe !</h1>
                <FormContainer onSubmit={handleCreatePost}>

                    <Thumbnail>
                        {thumbnail ?
                            <img src={thumbnail} alt='thumbnail' onDrop={dropHandle} onDragOver={dragOverHandle} />
                            :
                            <div id='fileinput' onDrop={dropHandle} onDragOver={dragOverHandle}>
                                <div>썸네일 이미지를 드래그 앤 드롭 해보세요.</div>
                                <div>썸네일 이미지는 jpg/png 확장자만 지원합니다.</div>
                            </div>}
                        <ButtonContainer>
                            <div>
                                파일선택
                                <input type='file' onChange={(e) => inputBtnhandle(e)} />
                            </div>
                            <CreateButton onClick={resetThumbnail} >
                                초기화
                            </CreateButton>
                        </ButtonContainer>
                    </Thumbnail>

                    <RecipeContainer>
                        <input placeholder='레시피 이름을 입력해 주세요.' value={recipeContents.title} onChange={(e) => handleOnChange(e, 'title')} />
                        <input placeholder='레시피 설명을 입력해 주세요.' value={recipeContents.description} onChange={(e) => handleOnChange(e, 'description')} />
                        <div className='step-container'>
                            <ul>
                                {recipeContents.steps.map((step, idx) => (
                                    <li key={idx}>
                                        <textarea value={step.stepContent} onChange={(e) => handleStepChange(e, idx)} placeholder={`Step ${idx + 1}`} />
                                    </li>
                                ))}
                            </ul>
                            <div className='button-container'>
                                <CreateButton onClick={addStep} size="small" boxColor="orange">추가</CreateButton>
                                <CreateButton onClick={deleteStep} size="small">삭제</CreateButton>
                            </div>
                        </div>


                        <IngredientContianer>
                            <input 
                                placeholder='필요한 재료를 입력해 주세요.' 
                                value={ingredientsInput} 
                                onChange={(e) => setIngredientsInput(e.target.value)} 
                                onKeyUp={(e) => spaceHandle(e)} />
                            <CurrentIngredients>
                                {ingredients.length ?
                                    <div>
                                        <TagBoxContainer>
                                            {ingredients.map((el, idx) => (
                                                <Tag key={idx} onClick={() => deleteTag(el)}>{el}</Tag>
                                            ))}
                                        </TagBoxContainer>
                                        <InformationMessage>
                                            <div>재료를 클릭하여 제거할 수 있습니다.</div>
                                            {duplicationErr && <div className='error'>동일한 재료는 입력할 수 없습니다.</div>}
                                        </InformationMessage>
                                    </div>
                                    :
                                    <InformationMessage>
                                        <div>입력한 재료는 이곳에서 확인 가능합니다.</div>
                                        <div>원하는 재료를 입력후 스페이스 바(Space bar)키 혹은 엔터(Enter)키를 눌러주세요</div>
                                    </InformationMessage>
                                }
                            </CurrentIngredients>
                        </IngredientContianer>

                    </RecipeContainer>

                    <TagContainer>
                        <div>
                            <h3>음식 종류</h3>
                            <TagBoxContainer>
                                {categories.categoryTag.map((category, idx) => (
                                    <Tag
                                        tags={[category]}
                                        key={idx}
                                        onClick={() => handleTagClick("category", category)}
                                        selected={selectedTags.category === category}
                                    >{category}</Tag>
                                ))}
                            </TagBoxContainer>
                        </div>
                        <div>
                            <h3>조리 시간 (min)</h3>
                            <TagBoxContainer>
                                {categories.timeTag.map((category, idx) => (
                                    <Tag
                                        tags={[category]}
                                        key={idx}
                                        onClick={() => handleTagClick("time", category)}
                                        selected={selectedTags.time === category}
                                    >{category}</Tag>
                                ))}
                            </TagBoxContainer>
                        </div>
                        <div>
                            <h3>난이도</h3>
                            <TagBoxContainer>
                                {categories.levelTag.map((category, idx) => (
                                    <Tag
                                        tags={[category]}
                                        key={idx}
                                        onClick={() => handleTagClick("level", category)}
                                        selected={selectedTags.level === category}
                                    >{category}</Tag>
                                ))}
                            </TagBoxContainer>
                        </div>
                    </TagContainer>
                    <div className='button-container'>
                        <CreateButton onClick={(e) => handleCreatePost(e)} disabled={!isSubmitEnabled} boxColor="orange" size="big">레시피 등록</CreateButton>
                    </div>
                </FormContainer>
            </MainContainer>
        </BodyContiner>
    )

}