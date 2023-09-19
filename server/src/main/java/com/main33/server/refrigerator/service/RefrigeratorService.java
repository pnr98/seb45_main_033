package com.main33.server.refrigerator.service;

import com.main33.server.member.entity.Member;
import com.main33.server.member.service.MemberService;
import com.main33.server.refrigerator.dto.RefrigeratorRequestDto;
import com.main33.server.refrigerator.entity.Refrigerator;
import com.main33.server.refrigerator.repository.RefrigeratorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RefrigeratorService {
    private final MemberService memberService;
    private final RefrigeratorRepository refrigeratorRepository;

    public RefrigeratorService(MemberService memberService, RefrigeratorRepository refrigeratorRepository) {
        this.memberService = memberService;
        this.refrigeratorRepository = refrigeratorRepository;
    }

    @Transactional
    public void updateRefrigerator(Long memberId, RefrigeratorRequestDto refrigeratorRequestDto) {

        Member member = memberService.findVerifiedMember(memberId);
        Refrigerator refrigerator = refrigeratorRepository.findByIdAndMember(memberId, member)
                .orElse(new Refrigerator());

        refrigerator.setMember(member);
        refrigerator.setPreferredIngredients(refrigeratorRequestDto.getPreferredIngredients());
        refrigerator.setDislikedIngredients(refrigeratorRequestDto.getDislikedIngredients());
        refrigerator.setAllergyIngredients(refrigeratorRequestDto.getAllergyIngredients());

        refrigeratorRepository.save(refrigerator);
    }
}
