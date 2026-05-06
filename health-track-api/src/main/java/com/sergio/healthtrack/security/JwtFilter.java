package com.sergio.healthtrack.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtFilter.class);

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //Busca el header: Authorization: Bearer <token>
        String header = request.getHeader("Authorization");

        try {
            if(header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7); //Quitar Bearer
                String username = jwtUtil.extraerUsername(token);

                if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails user = userDetailsService.loadUserByUsername(username);

                    if(jwtUtil.validarToken(token,user.getUsername())) {
                        log.info("Usuario autenticado: {}", user.getUsername());
                        log.info("Authorities: {}", user.getAuthorities());
                        //Le dice a Spring: este usuario esta autenticado
                        var auth = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
            }

            //Deja pasar el requesr al siguiente filtro o controlador
            filterChain.doFilter(request,response);
        } catch (ExpiredJwtException ex) {
            log.warn("JWT expirado: {}", ex.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("JWT expirado");
        }catch (JwtException ex) {
            log.warn("JWT inválido: {}", ex.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("JWT inválido");
        }
    }
}
