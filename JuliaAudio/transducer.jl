function c_h(b, s, f_u)
    n = length(b)
    dt = 1.0 / s
    phi = 0.0
    h_z = zeros(n)
    w = 512
    l_p = zeros(w)
    for i in 1:n
        ref_i = sin(2.0 * pi * f_u * i * dt)
        ref_q = cos(2.0 * pi * f_u * i * dt)
        s_i = b[i] * ref_i
        s_q = b[i] * ref_q
        
        idx = (i % w) + 1
        l_p[idx] = s_i
        v_i = sum(l_p) / w
        l_p[idx] = s_q
        v_q = sum(l_p) / w
        
        p_v = atan(v_q, v_i)
        if i > 1
            d_p = p_v - phi
            while d_p > pi d_p -= 2.0 * pi end
            while d_p < -pi d_p += 2.0 * pi end
            h_z[i] = abs(d_p / (2.0 * pi * dt))
        end
        phi = p_v
    end
    
    r_z = copy(h_z)
    for k in 1:2
        for i in w+1:n-w
            m = 0.0
            for j in -w÷4:w÷4
                m += r_z[i+j]
            end
            h_z[i] = m / (w÷2 + 1)
        end
        r_z = copy(h_z)
    end
    
    for i in 1:n
        h_z[i] = h_z[i] * (1.0 + 0.01 * sin(2.0 * pi * 10.0 * i * dt))
    end
    return h_z
end
