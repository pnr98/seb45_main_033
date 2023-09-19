import axios from "axios";
import { BodyContiner, MainContainer, FormContainer, Thumbnail, ButtonContainer, CurrentIngredients, RecipeContainer, IngredientContianer, TagContainer, TagBoxContainer, Tag, CreateButton, InformationMessage } from './UpdateRecipe.styled'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal/Modal'
import dummyDetail from "../../common/data/dummyDetail"

const BASE_URL = process.env.REACT_APP_API_URL;
export default function UpdateRecipe() {
    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false)
    const [ mainImageUrl, setMainImageUrl ] = useState('')
    const { recipe_id } = useParams();
    const memberId = 1;
    // const memberId = sessionStorage.getItem('memberId');
    const AccessToken = sessionStorage.getItem('Token');

    
    const [recipeData, setRecipeData] = useState(null);
    // 레시피 데이터 get
    useEffect(() => {
        axios.get(`${BASE_URL}/recipes/${recipe_id}`)
            .then((response) => {
                const { data } = response;
                setRecipeData(data)
                setMainImageUrl(data.mainImageUrl)
                setRecipeContents({
                    title: data.recipeName,
                    description: data.recipeDescription,
                    steps: data.steps.map((step) => ({
                        stepNumber: step.stepNumber,
                        stepContent: step.recipeContent,
                    })),
                });
                setIngredientList(data.ingredients.map((ingredient) => {
                    const regex = /(.+)\s+(\S+)$/;
                    const matches = ingredient.match(regex);
                    if(matches && matches.length === 3) {
                        return {
                            name: matches[1], // 재료이름
                            quantity: matches[2] // 양
                        }
                    } else {
                        return {
                            name: ''
                        }
                    }
                    }
                ))
                setSelectedTags({
                    category: data.foodTypes,
                    time: data.cookingTime,
                    level: data.difficulty,
                })
            }).catch((err) => {
                console.error("레시피 정보 요청 실패: ", err)
                //
                //
                setRecipeData(dummyDetail)
                setMainImageUrl(dummyDetail.mainImageUrl)
                setRecipeContents({
                    title: dummyDetail.recipeName,
                    description: dummyDetail.recipeDescription,
                    steps: dummyDetail.steps.map((step) => ({
                        stepNumber: step.stepNumber,
                        stepContent: step.recipeContent,
                    })),
                });
                setIngredientList(dummyDetail.ingredients.map((ingredient) => {
                    const regex = /(.+)\s+(\S+)$/;
                    const matches = ingredient.match(regex);
                    if(matches && matches.length === 3) {
                        return {
                            name: matches[1], // 재료이름
                            quantity: matches[2] // 양
                        }
                    } else {
                        return {
                            name: ''
                        }
                    }
                    }
                ))
                setSelectedTags({
                    category: dummyDetail.foodTypes,
                    time: dummyDetail.cookingTime,
                    level: dummyDetail.difficulty,
                })
            })
    }, [])

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
                setMainImageUrl(imageUrl)
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
                setMainImageUrl(imageUrl)
            } else {
                setShowModal(true)
            }   
        }
    }
    const resetMainImageUrl = () => {
        setMainImageUrl('')
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
    }

    // 재료
    const [ingredientInput, setIngredientInput] = useState('')
    const [ingredientList, setIngredientList] = useState([])
    const [duplicationErr, setDuplicationErr] = useState(false)
    const gapRegex = /^\S+$/
    
    const handleEnterPress = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault(); // 엔터 입력을 방지해 줄바꿈 방지
            addIngredient()
        }
    } 
    const addIngredient = ()=> {
        if (!ingredientInput.trim()) { // 입력이 비어있을 때는 처리하지 않음
            return;
        }
        const [name, quantity] = ingredientInput.split('/') // '/'를 기준으로 name, quantity 할당
        if (name && quantity) {
            const newIngredient = {
                name: name.trim(),
                quantity: quantity.trim(),
            };
        
            if (!ingredientList.some((ingredient) => ingredient.name === newIngredient.name)) {
                setIngredientList([...ingredientList, newIngredient]);
                setIngredientInput(''); // 입력 초기화
                setDuplicationErr(false);
            } else {
                setDuplicationErr(true);
            }
        } else {
            setDuplicationErr(true); // 재료명과 재료량을 모두 입력하지 않았을 경우 오류 처리
        }
    }
    const deleteIngredient = (idx) => {
        const updatedIngredients = [...ingredientList]
        updatedIngredients.splice(idx, 1);
        setIngredientList(updatedIngredients)
    }

    // recipe step
    const [recipeContents, setRecipeContents] = useState({
        title: "",
        description: "",
        steps: [{
            "stepNumber": 1,
            "stepContent": "",
        }],
    })
    const handleOnChange = (e, field) => {
        setRecipeContents({
            ...recipeContents,
            [field]: e.target.value,
        })
    }
    // 레시피 내용 변경
    const handleStepChange = (e, idx) => {
        const updatedSteps = [...recipeContents.steps];
        // updatedSteps[idx] = e.target.value
        updatedSteps[idx] = {
            ...updatedSteps[idx],
            stepContent: e.target.value
        };
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
                stepNumber: prevRecipeContent.steps.length + 1,
                stepContent: "", // 빈 단계 생성
            },]
        }))
    };
    // step 삭제
    const deleteStep = (idx) => {
        setRecipeContents((prevRecipeContent) => {
            const updatedSteps = [...recipeContents.steps];
            // updatedSteps.splice(idx, 1) // 해당 인덱스의 단계 삭제
            if(updatedSteps.length > 0) {
                updatedSteps.pop();
                for(let i = 0; i < updatedSteps.length; i++) {
                    updatedSteps[i].stepNumber = i + 1
                }
            }
            return {
                ...prevRecipeContent,
                steps: updatedSteps, // 업데이트된 단계 배열로 업데이트
            }
        })
    };

    // 등록버튼
    const isSubmitEnabled = 
            selectedTags.category !== null && 
            selectedTags.time !== null && 
            selectedTags.level !== null &&
            recipeContents.title.trim() !== "" &&
            recipeContents.description.trim() !== "" &&
            mainImageUrl !== "" &&
            recipeContents.steps.every((step) => step.stepContent.trim() !== "") &&
            ingredientList.length > 0

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        const requestData = {
            "memberId": memberId, //
            "foodType": selectedTags.category,
            "difficulty": selectedTags.level,
            "recipeName": recipeContents.title,
            "mainImageUrl": mainImageUrl,
            "recipeDescription": recipeContents.description,
            "cookingTime": selectedTags.time,
            "ingredients": ingredientList.map((ingredient) => (
                `${ingredient.name} ${ingredient.quantity}`
            )),
            "steps": recipeContents.steps.map((step, idx) => ({
                "stepNumber": idx + 1,
                "stepContent": step.stepContent,
            }))
        };
        if (!isSubmitEnabled) {
            alert('입력을 모두 해주세요')
            return
        } 
        try {
            const header = {
                Headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            }
            // const response = await axios.patch(`/recipes/${recipe_id}`, requestData, header)
            const response = await axios.patch(`${BASE_URL}/recipes/${recipe_id}`, requestData, header)
            if (response.status === 200) {
                setUpdateModal(true)
            }
        } catch (err) {
            console.error("레시피 등록 요청 실패:", err);
            //
            setUpdateModal(true)
        }
    }

    return (
        <BodyContiner>
            {showModal && <Modal type='Badextension' func={() => setShowModal(false)} />}
            {updateModal && <Modal type='Update' func={() => setUpdateModal(false)} recipe_id={recipe_id}/>}
            <MainContainer>
                <h1>Edit your recipe !</h1>
                <FormContainer onSubmit={handleUpdatePost}>
                    <Thumbnail>
                        <div onDrop={dropHandle} onDragOver={dragOverHandle}>
                            {mainImageUrl ?
                                <img src={mainImageUrl} alt='thumbnail' />
                                :
                                <div id='fileinput'>
                                    <div>썸네일 이미지를 드래그 앤 드롭 해보세요.</div>
                                    <div>썸네일 이미지는 jpg/png 확장자만 지원합니다.</div>
                                </div>}
                        </div>
                        <ButtonContainer>
                            <CreateButton>
                                파일선택
                                <input type='file' onChange={(e) => inputBtnhandle(e)} />
                            </CreateButton>
                            {/* <CreateButton onClick={resetMainImageUrl} >
                                초기화
                            </CreateButton> */}
                        </ButtonContainer>
                    </Thumbnail>

                    <RecipeContainer>
                        <div>
                            <h3>레시피 이름</h3>
                            <input placeholder='레시피 이름을 입력해 주세요.' value={recipeContents.title} onChange={(e) => handleOnChange(e, 'title')} />
                        </div>
                        <div>
                            <h3>레시피 설명</h3>
                            <input placeholder='레시피 설명을 입력해 주세요.' value={recipeContents.description} onChange={(e) => handleOnChange(e, 'description')} />
                        </div>
                        
                        <div className='step-container'>
                            <h3>레시피 순서</h3>
                            <ul>
                                {recipeContents.steps.map((step, idx) => (
                                    <li key={idx}>
                                        <textarea value={step.stepContent} onChange={(e) => handleStepChange(e, idx)} placeholder={`Step ${idx + 1}`} />
                                    </li>
                                ))}
                            </ul>
                            <div className='button-container'>
                                <CreateButton type="button" onClick={addStep} size="small" boxColor="orange">추가</CreateButton>
                                <CreateButton type="button" onClick={deleteStep} size="small">삭제</CreateButton>
                            </div>
                        </div>

                        <IngredientContianer>
                            <h3>레시피 재료</h3>
                            <input 
                                type='text'
                                placeholder='슬래시(/)를 기준으로 필요한 재료명과 재료량을 입력해주세요. 예시) 감자/10g' 
                                value={ingredientInput} 
                                onChange={(e) => setIngredientInput(e.target.value)} 
                                onKeyPress={handleEnterPress} 
                            />
                            <CurrentIngredients>
                                {ingredientList.length ? (
                                    <div>
                                        <TagBoxContainer>
                                            {ingredientList.map((ingredient, idx) => (
                                                <Tag key={idx} onClick={() => deleteIngredient(idx)}>{ingredient.name}/{ingredient.quantity}</Tag>
                                            ))}
                                        </TagBoxContainer>
                                        <InformationMessage>
                                            <div>재료를 클릭하여 제거할 수 있습니다.</div>
                                            {duplicationErr && <div className='error'>동일한 재료는 입력할 수 없습니다.</div>}
                                        </InformationMessage>
                                    </div>
                                    ) : (
                                    <InformationMessage>
                                        <div>입력한 재료는 이곳에서 확인 가능합니다.</div>
                                        <div>원하는 재료를 입력후 엔터(Enter)키를 눌러주세요</div>
                                    </InformationMessage>
                                    )
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
                        <CreateButton onClick={(e) => handleUpdatePost(e)} boxColor="orange" size="big">레시피 수정</CreateButton>
                    </div>
                </FormContainer>
            </MainContainer>
        </BodyContiner>
    )

}